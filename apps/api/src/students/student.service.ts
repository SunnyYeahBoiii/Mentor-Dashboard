import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { studentCreateDto } from '../../dtos/student-dtos';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) {}

    async createStudent(student: studentCreateDto) {
        return this.prisma.$transaction(async (tx) => {
            return tx.student.create({
                data: student,
            });
        });
    }

    async getAllStudents() {
        const students = await this.prisma.student.findMany();
        return students.map((s) => ({
            id: s.id,
            name: s.firstName + ' ' + s.middleName + ' ' + s.lastName,
        }));
    }

    async deleteStudent(id: string) {
        return this.prisma.$transaction(async (tx) => {
            await tx.studentInClass.deleteMany({
                where: { studentId: id },
            });

            return tx.student.delete({
                where: { id },
            });
        });
    }

    async editStudent(id: string, student: studentCreateDto) {
        return this.prisma.student.update({
            where: { id },
            data: student,
        });
    }

    async getStudentById(id: string) {
        if (id === 'None') return null;
        return this.prisma.student.findUnique({
            where: { id },
        });
    }

    async getStudentPage(page: number, pageSize: number = 8) {
        console.log(page, pageSize);
        const skip = (page - 1) * pageSize;
        const [students, total] = await Promise.all([
            this.prisma.student.findMany({
                skip: skip,
                take: pageSize,
            }),
            this.prisma.student.count(),
        ]);
        return {
            data: students,
            total,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
        };
    }

    async getStudentTotalPages(pageSize: number = 8) {
        const total = await this.prisma.student.count();
        return Math.ceil(total / pageSize);
    }

    async studentPaySections(studentId: string, sectionPaid: number) {
        return this.prisma.$transaction(async (tx) => {
            return tx.student.update({
                where: {
                    id: studentId,
                },
                data: {
                    paid_sections: { increment: sectionPaid },
                },
            });
        });
    }

    async getAllPayment() {
        const data = await this.prisma.$queryRaw<any[]>`
            SELECT s.*, COUNT(sect.id) as section_count, SUM(section_fee) as total_fee
            FROM "Student" s
            JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            JOIN "Class" c ON sic."classId" = c.id
            JOIN "Section" sect ON c.id = sect."classId"
            GROUP BY s.id
        `;

        return data.map((item) => ({
            ...item,
            section_count: Number(item.section_count),
        }));
    }

    async getPaymentPage(page: number, pageSize: number = 8) {
        const skip = (page - 1) * pageSize;
        const [students, total] = await Promise.all([
            this.prisma.$queryRaw<any[]>`
                SELECT s.*, COUNT(sect.id) as section_count , SUM(section_fee) as total_fee
                FROM "Student" s
                JOIN "Student_in_Class" sic ON s.id = sic."studentId"
                JOIN "Class" c ON sic."classId" = c.id
                JOIN "Section" sect ON c.id = sect."classId"
                GROUP BY s.id
                LIMIT ${pageSize} OFFSET ${skip}
            `,
            this.prisma.$queryRaw<any[]>`
                SELECT COUNT(*) as total
                FROM "Student" s
                JOIN "Student_in_Class" sic ON s.id = sic."studentId"
                JOIN "Class" c ON sic."classId" = c.id
                JOIN "Section" sect ON c.id = sect."classId"
            `,
        ]);
        return {
            data: students.map((student) => ({
                ...student,
                section_count: Number(student.section_count),
                total_fee: Number(student.total_fee),
            })),
            total: Number(total[0].total),
            totalPages: Math.ceil(Number(total[0].total) / pageSize),
            currentPage: page,
        };
    }

    async getPaymentTotalPages(pageSize: number = 8) {
        const total = await this.prisma.$queryRaw<any[]>`
            SELECT COUNT(*) as total
            FROM "Student" s
            JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            JOIN "Class" c ON sic."classId" = c.id
            JOIN "Section" sect ON c.id = sect."classId"
        `;
        return Math.ceil(Number(total[0].total) / pageSize);
    }

    async getStudentPayment(studentId: string) {
        const data = await this.prisma.$queryRaw<any[]>`
            SELECT s.*, COUNT(sect.id) as section_count, SUM(section_fee) as total_fee
            FROM "Student" s
            JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            JOIN "Class" c ON sic."classId" = c.id
            JOIN "Section" sect ON c.id = sect."classId"
            WHERE s.id = ${studentId}
            GROUP BY s.id
        `;

        return data.map((item) => ({
            ...item,
            section_count: Number(item.section_count),
        }));
    }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { studentCreateDto } from '../../dtos/student-dtos';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) { }

    async createStudent(student: studentCreateDto) {
        return this.prisma.$transaction(async (tx) => {
            return tx.student.create({
                data: student,
            });
        });
    }

    async getAllStudents(page: number = 1, pageSize: number = 200) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const skip = (Math.max(page, 1) - 1) * safePageSize;
        const students = await this.prisma.student.findMany({
            skip,
            take: safePageSize,
        });
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

    async studentPaySections(
        studentId: string,
        sectionPaid: number,
        tuitionPaid: number = 0,
    ) {
        const sectionPaidNumber = Number(sectionPaid);
        const tuitionPaidNumber = Number(tuitionPaid);

        if (!Number.isFinite(sectionPaidNumber) || sectionPaidNumber < 0) {
            throw new BadRequestException(
                'section_paid must be a non-negative number',
            );
        }

        if (!Number.isFinite(tuitionPaidNumber) || tuitionPaidNumber < 0) {
            throw new BadRequestException(
                'tuition_paid must be a non-negative number',
            );
        }

        const safeSectionPaid = Math.floor(sectionPaidNumber);
        const safeTuitionPaid = Math.floor(tuitionPaidNumber);

        return this.prisma.$transaction(async (tx) => {
            const paymentRows = await tx.$queryRaw<any[]>`
                SELECT
                    s.id,
                    s.paid_sections,
                    s.amount_paid,
                    COUNT(sect.id) as section_count,
                    COALESCE(SUM(c.section_fee), 0) as total_fee
                FROM "Student" s
                JOIN "Student_in_Class" sic ON s.id = sic."studentId"
                JOIN "Class" c ON sic."classId" = c.id
                JOIN "Section" sect ON c.id = sect."classId"
                WHERE s.id = ${studentId}
                GROUP BY s.id
            `;

            if (!paymentRows.length) {
                throw new BadRequestException(
                    'Student payment record not found',
                );
            }

            const paymentInfo = paymentRows[0];
            const totalSections = Number(paymentInfo.section_count);
            const currentPaidSections = Number(paymentInfo.paid_sections);
            const remainingSections = totalSections - currentPaidSections;

            const totalFee = Number(paymentInfo.total_fee);
            const currentAmountPaid = Number(paymentInfo.amount_paid);
            const remainingTuition = totalFee - currentAmountPaid;

            if (safeSectionPaid > remainingSections) {
                throw new BadRequestException(
                    `section_paid exceeds remaining sections (${remainingSections})`,
                );
            }

            if (safeTuitionPaid > remainingTuition) {
                throw new BadRequestException(
                    `tuition_paid exceeds remaining tuition (${remainingTuition})`,
                );
            }

            return tx.student.update({
                where: {
                    id: studentId,
                },
                data: {
                    paid_sections: { increment: safeSectionPaid },
                    amount_paid: { increment: safeTuitionPaid },
                },
            });
        });
    }

    async getAllPayment(page: number = 1, pageSize: number = 200) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const skip = (Math.max(page, 1) - 1) * safePageSize;
        const data = await this.prisma.$queryRaw<any[]>`
            SELECT
                s.id,
                s."firstName",
                s."middleName",
                s."lastName",
                s.birthyear,
                s.school,
                s.province,
                s.paid_sections,
                s.amount_paid,
                COUNT(sect.id) as section_count,
                COALESCE(SUM(c.section_fee), 0) as total_fee
            FROM "Student" s
            JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            JOIN "Class" c ON sic."classId" = c.id
            JOIN "Section" sect ON c.id = sect."classId"
            GROUP BY s.id
            LIMIT ${safePageSize} OFFSET ${skip}
        `;

        return data.map((item) => {
            const totalFee = Number(item.total_fee);
            const amountPaid = Number(item.amount_paid);
            return {
                ...item,
                section_count: Number(item.section_count),
                total_fee: totalFee,
                amount_paid: amountPaid,
                tuition_fee: totalFee - amountPaid,
            };
        });
    }

    async getPaymentPage(page: number, pageSize: number = 8) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const skip = (Math.max(page, 1) - 1) * safePageSize;
        const [students, total] = await Promise.all([
            this.prisma.$queryRaw<any[]>`
                SELECT
                    s.id,
                    s."firstName",
                    s."middleName",
                    s."lastName",
                    s.birthyear,
                    s.school,
                    s.province,
                    s.paid_sections,
                    s.amount_paid,
                    COUNT(sect.id) as section_count,
                    COALESCE(SUM(c.section_fee), 0) as total_fee
                FROM "Student" s
                JOIN "Student_in_Class" sic ON s.id = sic."studentId"
                JOIN "Class" c ON sic."classId" = c.id
                JOIN "Section" sect ON c.id = sect."classId"
                GROUP BY s.id
                LIMIT ${safePageSize} OFFSET ${skip}
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
            data: students.map((student) => {
                const totalFee = Number(student.total_fee);
                const amountPaid = Number(student.amount_paid);
                return {
                    ...student,
                    section_count: Number(student.section_count),
                    total_fee: totalFee,
                    amount_paid: amountPaid,
                    tuition_fee: totalFee - amountPaid,
                };
            }),
            total: Number(total[0].total),
            totalPages: Math.ceil(Number(total[0].total) / safePageSize),
            currentPage: Math.max(page, 1),
        };
    }

    async getPaymentTotalPages(pageSize: number = 8) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const total = await this.prisma.$queryRaw<any[]>`
            SELECT COUNT(*) as total
            FROM "Student" s
            JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            JOIN "Class" c ON sic."classId" = c.id
            JOIN "Section" sect ON c.id = sect."classId"
        `;
        return Math.ceil(Number(total[0].total) / safePageSize);
    }

    async getStudentPayment(studentId: string) {
        const data = await this.prisma.$queryRaw<any[]>`
            SELECT
                s.id,
                s."firstName",
                s."middleName",
                s."lastName",
                s.birthyear,
                s.school,
                s.province,
                s.paid_sections,
                s.amount_paid,
                COUNT(sect.id) as section_count,
                COALESCE(SUM(c.section_fee), 0) as total_fee
            FROM "Student" s
            JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            JOIN "Class" c ON sic."classId" = c.id
            JOIN "Section" sect ON c.id = sect."classId"
            WHERE s.id = ${studentId}
            GROUP BY s.id
        `;

        console.log(data);

        return data.map((item) => {
            const totalFee = Number(item.total_fee);
            const amountPaid = Number(item.amount_paid);
            return {
                ...item,
                section_count: Number(item.section_count),
                total_fee: totalFee,
                amount_paid: amountPaid,
                tuition_fee: totalFee - amountPaid,
            };
        });
    }
}

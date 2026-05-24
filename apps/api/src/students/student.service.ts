import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, type PrismaClient } from '../../generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { studentCreateDto } from '../../dtos/student-dtos';

type PaymentRow = {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthyear: number | null;
    school: string | null;
    province: string | null;
    paid_sections: number | bigint;
    amount_paid: number | bigint;
    section_count: number | bigint;
    total_fee: number | bigint;
};

type PaymentClient = PrismaService | Prisma.TransactionClient | PrismaClient;

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) {}

    async createStudent(student: studentCreateDto) {
        const { birthyear, ...rest } = student;
        return this.prisma.student.create({
            data: { ...rest, birthyear: birthyear ?? undefined },
        });
    }

    async getAllStudents(page: number = 1, pageSize: number = 200) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        const students = await this.prisma.student.findMany({
            skip,
            take: safePageSize,
        });
        return students.map((s) => ({
            id: s.id,
            name: [s.firstName, s.middleName, s.lastName]
                .filter(Boolean)
                .join(' '),
        }));
    }

    async deleteStudent(id: string) {
        return this.prisma.$transaction(async (tx) => {
            const memberships = await tx.studentInClass.findMany({
                where: { studentId: id },
                select: { classId: true },
            });

            await tx.studentInClass.deleteMany({
                where: { studentId: id },
            });

            for (const membership of memberships) {
                await tx.class.updateMany({
                    where: {
                        id: membership.classId,
                        students_count: { gt: 0 },
                    },
                    data: {
                        students_count: { decrement: 1 },
                    },
                });
            }

            return tx.student.delete({
                where: { id },
            });
        });
    }

    async editStudent(id: string, student: studentCreateDto) {
        const { birthyear, ...rest } = student;
        return this.prisma.student.update({
            where: { id },
            data: { ...rest, birthyear: birthyear ?? undefined },
        });
    }

    async getStudentById(id: string) {
        if (id === 'None') return null;
        return this.prisma.student.findUnique({
            where: { id },
        });
    }

    async getStudentPage(page: number, pageSize: number = 8) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        const [students, total] = await Promise.all([
            this.prisma.student.findMany({
                skip,
                take: safePageSize,
            }),
            this.prisma.student.count(),
        ]);
        return {
            data: students,
            total,
            totalPages: Math.ceil(total / safePageSize),
            currentPage: safePage,
        };
    }

    async getStudentTotalPages(pageSize: number = 8) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const total = await this.prisma.student.count();
        return Math.ceil(total / safePageSize);
    }

    private normalizePaymentRow(row: PaymentRow) {
        const sectionCount = Number(row.section_count);
        const totalFee = Number(row.total_fee);
        const amountPaid = Number(row.amount_paid);
        const paidSections = Number(row.paid_sections);

        return {
            ...row,
            paid_sections: paidSections,
            amount_paid: amountPaid,
            section_count: sectionCount,
            total_fee: totalFee,
            tuition_fee: totalFee - amountPaid,
        };
    }

    private paymentBaseQuery(tx: PaymentClient, studentId?: string) {
        if (studentId) {
            return tx.$queryRaw<PaymentRow[]>`
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
                    COUNT(sect.id) AS section_count,
                    COALESCE(SUM(c.section_fee), 0) AS total_fee
                FROM "Student" s
                LEFT JOIN "Student_in_Class" sic ON s.id = sic."studentId"
                LEFT JOIN "Class" c ON sic."classId" = c.id
                LEFT JOIN "Section" sect ON c.id = sect."classId"
                WHERE s.id = ${studentId}
                GROUP BY s.id
            `;
        }

        return tx.$queryRaw<PaymentRow[]>`
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
                COUNT(sect.id) AS section_count,
                COALESCE(SUM(c.section_fee), 0) AS total_fee
            FROM "Student" s
            LEFT JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            LEFT JOIN "Class" c ON sic."classId" = c.id
            LEFT JOIN "Section" sect ON c.id = sect."classId"
            GROUP BY s.id
            ORDER BY s."lastName", s."firstName", s.id
        `;
    }

    async studentPaySections(
        studentId: string,
        sectionPaid: number,
        tuitionPaid: number = 0,
    ) {
        const sectionPaidNumber = Number(sectionPaid);
        const tuitionPaidNumber = Number(tuitionPaid);

        if (!Number.isInteger(sectionPaidNumber) || sectionPaidNumber < 0) {
            throw new BadRequestException(
                'section_paid must be a non-negative integer',
            );
        }

        if (!Number.isInteger(tuitionPaidNumber) || tuitionPaidNumber < 0) {
            throw new BadRequestException(
                'tuition_paid must be a non-negative integer',
            );
        }

        return this.prisma.$transaction(
            async (tx) => {
                const paymentRows = await this.paymentBaseQuery(tx, studentId);

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

                if (sectionPaidNumber > remainingSections) {
                    throw new BadRequestException(
                        `section_paid exceeds remaining sections (${remainingSections})`,
                    );
                }

                if (tuitionPaidNumber > remainingTuition) {
                    throw new BadRequestException(
                        `tuition_paid exceeds remaining tuition (${remainingTuition})`,
                    );
                }

                return tx.student.update({
                    where: {
                        id: studentId,
                    },
                    data: {
                        paid_sections: { increment: sectionPaidNumber },
                        amount_paid: { increment: tuitionPaidNumber },
                    },
                });
            },
            { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
    }

    async getAllPayment(page: number = 1, pageSize: number = 200) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        const data = await this.prisma.$queryRaw<PaymentRow[]>`
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
                COUNT(sect.id) AS section_count,
                COALESCE(SUM(c.section_fee), 0) AS total_fee
            FROM "Student" s
            LEFT JOIN "Student_in_Class" sic ON s.id = sic."studentId"
            LEFT JOIN "Class" c ON sic."classId" = c.id
            LEFT JOIN "Section" sect ON c.id = sect."classId"
            GROUP BY s.id
            ORDER BY s."lastName", s."firstName", s.id
            LIMIT ${safePageSize} OFFSET ${skip}
        `;

        return data.map((item) => this.normalizePaymentRow(item));
    }

    async getPaymentPage(page: number, pageSize: number = 8) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        const [students, total] = await Promise.all([
            this.prisma.$queryRaw<PaymentRow[]>`
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
                    COUNT(sect.id) AS section_count,
                    COALESCE(SUM(c.section_fee), 0) AS total_fee
                FROM "Student" s
                LEFT JOIN "Student_in_Class" sic ON s.id = sic."studentId"
                LEFT JOIN "Class" c ON sic."classId" = c.id
                LEFT JOIN "Section" sect ON c.id = sect."classId"
                GROUP BY s.id
                ORDER BY s."lastName", s."firstName", s.id
                LIMIT ${safePageSize} OFFSET ${skip}
            `,
            this.prisma.student.count(),
        ]);
        return {
            data: students.map((student) => this.normalizePaymentRow(student)),
            total,
            totalPages: Math.ceil(total / safePageSize),
            currentPage: safePage,
        };
    }

    async getPaymentTotalPages(pageSize: number = 8) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const total = await this.prisma.student.count();
        return Math.ceil(total / safePageSize);
    }

    async getStudentPayment(studentId: string) {
        const data = await this.paymentBaseQuery(this.prisma, studentId);
        return data[0] ? this.normalizePaymentRow(data[0]) : null;
    }
}

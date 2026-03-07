import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentClassService {
    constructor(private readonly prisma: PrismaService) {}

    async addStudentToClass(studentId: string, classId: string) {
        return this.prisma.$transaction(async (tx) => {
            const result = await tx.studentInClass.create({
                data: {
                    studentId,
                    classId,
                },
            });

            await tx.class.update({
                where: { id: classId },
                data: {
                    students_count: { increment: 1 },
                },
            });

            return result;
        });
    }

    async removeStudentFromClass(studentId: string, classId: string) {
        return this.prisma.$transaction(async (tx) => {
            const result = await tx.studentInClass.delete({
                where: {
                    studentId_classId: {
                        studentId,
                        classId,
                    },
                },
            });

            await tx.class.update({
                where: { id: classId },
                data: {
                    students_count: { decrement: 1 },
                },
            });

            return result;
        });
    }

    async getStudentInClass(
        classId: string,
        page: number = 1,
        pageSize: number = 200,
    ) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const skip = (Math.max(page, 1) - 1) * safePageSize;
        const studentList = await this.prisma.studentInClass.findMany({
            where: { classId },
            orderBy: { studentId: 'asc' },
            skip,
            take: safePageSize,
        });
        const studentIds = studentList.map((student) => student.studentId);
        return this.prisma.student.findMany({
            where: { id: { in: studentIds } },
        });
    }

    async getStudentNotInClass(
        classId: string,
        page: number = 1,
        pageSize: number = 200,
    ) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const skip = (Math.max(page, 1) - 1) * safePageSize;
        const studentList = await this.prisma.studentInClass.findMany({
            where: { classId },
        });
        const studentIds = studentList.map((student) => student.studentId);
        return this.prisma.student.findMany({
            where: { id: { notIn: studentIds } },
            skip,
            take: safePageSize,
        });
    }
}

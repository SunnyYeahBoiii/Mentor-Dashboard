import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentClassService {
    constructor(private readonly prisma: PrismaService) { }

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

    async getStudentInClass(classId: string) {
        const studentList = await this.prisma.studentInClass.findMany({
            where: { classId },
        });
        const studentIds = studentList.map((student) => student.studentId);
        return this.prisma.student.findMany({
            where: { id: { in: studentIds } },
        });
    }

    async getStudentNotInClass(classId: string) {
        const studentList = await this.prisma.studentInClass.findMany({
            where: { classId },
        });
        const studentIds = studentList.map((student) => student.studentId);
        return this.prisma.student.findMany({
            where: { id: { notIn: studentIds } },
        });
    }
}

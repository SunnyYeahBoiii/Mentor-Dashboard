import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

function hasPrismaCode(error: unknown, code: string) {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: unknown }).code === code
    );
}

@Injectable()
export class StudentClassService {
    constructor(private readonly prisma: PrismaService) {}

    async addStudentToClass(studentId: string, classId: string) {
        // Verify student and class exist
        const [student, classRecord] = await Promise.all([
            this.prisma.student.findUnique({ where: { id: studentId } }),
            this.prisma.class.findUnique({ where: { id: classId } }),
        ]);

        if (!student)
            throw new NotFoundException(`Student ${studentId} not found`);
        if (!classRecord)
            throw new NotFoundException(`Class ${classId} not found`);

        return this.prisma.$transaction(async (tx) => {
            try {
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
            } catch (error: unknown) {
                if (hasPrismaCode(error, 'P2002')) {
                    throw new ConflictException(
                        'Student is already in this class',
                    );
                }
                throw error;
            }
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

            await tx.class.updateMany({
                where: {
                    id: classId,
                    students_count: { gt: 0 },
                },
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
        if (studentIds.length === 0) {
            return this.prisma.student.findMany({
                skip,
                take: safePageSize,
            });
        }
        return this.prisma.student.findMany({
            where: { id: { notIn: studentIds } },
            skip,
            take: safePageSize,
        });
    }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class StudentClassService {
    constructor(private readonly prisma: PrismaService) { }
    async addStudentToClass(studentId: string, classId: string) {
        return this.prisma.studentInClass.create({
            data: {
                studentId,
                classId
            }
        })
    }

    async removeStudentFromClass(studentId: string, classId: string) {
        return this.prisma.studentInClass.delete({
            where: {
                studentId_classId: {
                    studentId,
                    classId
                }
            }
        })
    }
}
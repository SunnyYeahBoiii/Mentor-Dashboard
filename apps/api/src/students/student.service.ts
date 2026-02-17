import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { studentCreateDto } from "../../dtos/student-dtos";

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) { }

    async createStudent(student: studentCreateDto) {
        return this.prisma.student.create({
            data: student
        })
    }

    async getAllStudents() {
        return this.prisma.student.findMany()
    }

    async getStudentById(id: string) {
        return this.prisma.student.findUnique({
            where: { id }
        })
    }

    async updateStudent(id: string, student: studentCreateDto) {
        return this.prisma.student.update({
            where: { id },
            data: student
        })
    }

    async deleteStudent(id: string) {
        return this.prisma.student.delete({
            where: { id }
        })
    }


}
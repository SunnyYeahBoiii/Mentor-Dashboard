import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { classCreateDto } from "../../dtos/class-dtos";

@Injectable()
export class ClassService {
    constructor(private readonly prisma: PrismaService) { }

    async createClass(classInfo: classCreateDto) {
        if (!classInfo.section_count) {
            classInfo.section_count = 0;
        }

        return this.prisma.class.create({
            data: classInfo
        })
    }

    async deleteClass(id: string) {
        return this.prisma.class.delete({
            where: { id }
        })
    }

    async editClass(id: string, classInfo: classCreateDto) {
        return this.prisma.class.update({
            where: { id },
            data: classInfo
        })
    }
}
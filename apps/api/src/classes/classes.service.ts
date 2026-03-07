import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { classCreateDto } from '../../dtos/class-dtos';

@Injectable()
export class ClassService {
    constructor(private readonly prisma: PrismaService) {}

    async createClass(classInfo: classCreateDto) {
        if (!classInfo.section_count) {
            classInfo.section_count = 0;
        }

        return this.prisma.$transaction(async (tx) => {
            return tx.class.create({
                data: classInfo,
            });
        });
    }

    async deleteClass(id: string) {
        return this.prisma.$transaction(async (tx) => {
            await tx.studentInClass.deleteMany({
                where: { classId: id },
            });

            await tx.section.deleteMany({
                where: { classId: id },
            });

            await tx.runningSection.deleteMany({
                where: { classId: id },
            });

            return tx.class.delete({
                where: { id },
            });
        });
    }

    async editClass(id: string, classInfo: classCreateDto) {
        return this.prisma.class.update({
            where: { id },
            data: classInfo,
        });
    }

    async getClassById(id: string) {
        if (id === 'None') return null;
        return this.prisma.class.findUnique({
            where: { id },
        });
    }

    async getClassList(page: number = 1, pageSize: number = 200) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const skip = (Math.max(page, 1) - 1) * safePageSize;
        const classes = await this.prisma.class.findMany({
            skip,
            take: safePageSize,
        });
        return classes.map((c) => ({
            id: c.id,
            name: c.name,
        }));
    }

    async getClassPage(page: number, pageSize: number = 3) {
        const skip = (page - 1) * pageSize;
        const [classes, total] = await Promise.all([
            this.prisma.class.findMany({
                skip,
                take: pageSize,
            }),
            this.prisma.class.count(),
        ]);
        return {
            data: classes,
            total,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
        };
    }

    async getClassTotalPages(pageSize: number = 3) {
        const total = await this.prisma.class.count();
        return Math.ceil(total / pageSize);
    }
}

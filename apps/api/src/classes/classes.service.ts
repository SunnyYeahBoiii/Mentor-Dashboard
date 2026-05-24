import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { classCreateDto } from '../../dtos/class-dtos';

@Injectable()
export class ClassService {
    constructor(private readonly prisma: PrismaService) {}

    async createClass(classInfo: classCreateDto) {
        return this.prisma.class.create({
            data: {
                name: classInfo.name,
                section_fee: classInfo.section_fee,
            },
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
            data: {
                name: classInfo.name,
                section_fee: classInfo.section_fee,
            },
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
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        const [classes, total] = await Promise.all([
            this.prisma.class.findMany({
                skip,
                take: safePageSize,
            }),
            this.prisma.class.count(),
        ]);
        return {
            data: classes,
            total,
            totalPages: Math.ceil(total / safePageSize),
            currentPage: safePage,
        };
    }

    async getClassTotalPages(pageSize: number = 3) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const total = await this.prisma.class.count();
        return Math.ceil(total / safePageSize);
    }
}

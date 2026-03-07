import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    sectionCreateDto,
    sectionUpdateDto,
    sectionTransferDto,
    runningSectionCreateDto,
} from '../../dtos/section-dtos';

@Injectable()
export class SectionsService {
    constructor(private readonly prisma: PrismaService) {}

    async getSections(page: number, pageSize: number = 3) {
        const skip = (page - 1) * pageSize;
        const [sections, total] = await Promise.all([
            this.prisma.section.findMany({
                skip,
                take: pageSize,
            }),
            this.prisma.section.count(),
        ]);
        return {
            data: sections,
            total,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
        };
    }

    async getSectionsByClassId(
        classId: string,
        page: number = 1,
        pageSize: number = 200,
    ) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const skip = (Math.max(page, 1) - 1) * safePageSize;
        return this.prisma.section.findMany({
            where: { classId },
            skip,
            take: safePageSize,
        });
    }

    async getSectionById(id: string) {
        return this.prisma.section.findUnique({
            where: { id },
        });
    }

    async createSection(sectionInfo: sectionCreateDto) {
        return this.prisma.$transaction(async (tx) => {
            const result = await tx.section.create({
                data: sectionInfo,
            });

            await tx.class.update({
                where: { id: sectionInfo.classId },
                data: {
                    section_count: { increment: 1 },
                },
            });

            return result;
        });
    }

    async updateSection(sectionInfo: sectionUpdateDto) {
        return this.prisma.section.update({
            where: { id: sectionInfo.id },
            data: {
                name: sectionInfo.name,
                classId: sectionInfo.classId,
                className: sectionInfo.className,
                startTime: sectionInfo.startTime,
                endTime: sectionInfo.endTime,
            },
        });
    }

    async deleteSection(id: string) {
        return this.prisma.$transaction(async (tx) => {
            const section = await tx.section.findUnique({
                where: { id },
            });

            if (!section) {
                return null;
            }

            const result = await tx.section.delete({
                where: { id },
            });

            await tx.class.update({
                where: { id: section.classId },
                data: {
                    section_count: { decrement: 1 },
                },
            });

            return result;
        });
    }

    async createSectionFromRunningSection(
        runningSectionInfo: sectionTransferDto,
    ) {
        return this.prisma.$transaction(async (tx) => {
            await tx.runningSection.delete({
                where: { id: runningSectionInfo.runningId },
            });

            const result = await tx.section.create({
                data: {
                    name: runningSectionInfo.name,
                    classId: runningSectionInfo.classId,
                    className: runningSectionInfo.className,
                    startTime: runningSectionInfo.startTime,
                    endTime: runningSectionInfo.endTime,
                },
            });

            await tx.class.update({
                where: { id: runningSectionInfo.classId },
                data: {
                    section_count: { increment: 1 },
                },
            });

            return result;
        });
    }

    async getRunningSections(page: number, pageSize: number = 3) {
        const skip = (page - 1) * pageSize;
        const [runningSections, total] = await Promise.all([
            this.prisma.runningSection.findMany({
                skip,
                take: pageSize,
            }),
            this.prisma.runningSection.count(),
        ]);
        return {
            data: runningSections,
            total,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page,
        };
    }

    async getRunningSectionById(id: string) {
        return this.prisma.runningSection.findUnique({
            where: { id },
        });
    }

    async createRunningSection(sectionInfo: runningSectionCreateDto) {
        return this.prisma.runningSection.create({
            data: {
                name: sectionInfo.name,
                classId: sectionInfo.classId,
                className: sectionInfo.className,
                startTime: new Date(),
                meetingLink: sectionInfo.meetingLink,
            },
        });
    }

    async removeRunningSection(id: string) {
        return this.prisma.runningSection.delete({
            where: { id },
        });
    }
}

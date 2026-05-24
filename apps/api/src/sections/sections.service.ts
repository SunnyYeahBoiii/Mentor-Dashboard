import { Injectable, NotFoundException } from '@nestjs/common';
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
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        const [sections, total] = await Promise.all([
            this.prisma.section.findMany({
                skip,
                take: safePageSize,
                orderBy: { startTime: 'desc' },
            }),
            this.prisma.section.count(),
        ]);
        return {
            data: sections,
            total,
            totalPages: Math.ceil(total / safePageSize),
            currentPage: safePage,
        };
    }

    async getSectionsByClassId(
        classId: string,
        page: number = 1,
        pageSize: number = 200,
    ) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        return this.prisma.section.findMany({
            where: { classId },
            skip,
            take: safePageSize,
            orderBy: { startTime: 'desc' },
        });
    }

    async getSectionById(id: string) {
        return this.prisma.section.findUnique({
            where: { id },
        });
    }

    async createSection(sectionInfo: sectionCreateDto) {
        return this.prisma.$transaction(async (tx) => {
            const classRecord = await tx.class.findUnique({
                where: { id: sectionInfo.classId },
            });

            if (!classRecord) {
                throw new NotFoundException(
                    `Class ${sectionInfo.classId} not found`,
                );
            }

            const result = await tx.section.create({
                data: {
                    name: sectionInfo.name,
                    classId: classRecord.id,
                    className: classRecord.name,
                    startTime: sectionInfo.startTime,
                    endTime: sectionInfo.endTime,
                },
            });

            await tx.class.update({
                where: { id: classRecord.id },
                data: {
                    section_count: { increment: 1 },
                },
            });

            return result;
        });
    }

    async updateSection(sectionInfo: sectionUpdateDto) {
        return this.prisma.$transaction(async (tx) => {
            const existing = await tx.section.findUnique({
                where: { id: sectionInfo.id },
            });

            if (!existing) {
                throw new NotFoundException(
                    `Section ${sectionInfo.id} not found`,
                );
            }

            const targetClass = await tx.class.findUnique({
                where: { id: sectionInfo.classId },
            });

            if (!targetClass) {
                throw new NotFoundException(
                    `Class ${sectionInfo.classId} not found`,
                );
            }

            const movedClass = existing.classId !== targetClass.id;

            const result = await tx.section.update({
                where: { id: sectionInfo.id },
                data: {
                    name: sectionInfo.name,
                    classId: targetClass.id,
                    className: targetClass.name,
                    startTime: sectionInfo.startTime,
                    endTime: sectionInfo.endTime,
                },
            });

            if (movedClass) {
                await tx.class.updateMany({
                    where: {
                        id: existing.classId,
                        section_count: { gt: 0 },
                    },
                    data: {
                        section_count: { decrement: 1 },
                    },
                });
                await tx.class.update({
                    where: { id: targetClass.id },
                    data: {
                        section_count: { increment: 1 },
                    },
                });
            }

            return result;
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

            await tx.class.updateMany({
                where: {
                    id: section.classId,
                    section_count: { gt: 0 },
                },
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
            const runningSection = await tx.runningSection.findUnique({
                where: { id: runningSectionInfo.runningId },
            });

            if (!runningSection) {
                throw new NotFoundException(
                    `Running section ${runningSectionInfo.runningId} not found`,
                );
            }

            await tx.runningSection.delete({
                where: { id: runningSection.id },
            });

            const result = await tx.section.create({
                data: {
                    name: runningSectionInfo.name || runningSection.name,
                    classId: runningSection.classId,
                    className: runningSection.className,
                    startTime: runningSection.startTime,
                    endTime: runningSectionInfo.endTime,
                },
            });

            await tx.class.update({
                where: { id: runningSection.classId },
                data: {
                    section_count: { increment: 1 },
                },
            });

            return result;
        });
    }

    async getRunningSections(page: number, pageSize: number = 3) {
        const safePageSize = Math.min(Math.max(pageSize, 1), 200);
        const safePage = Math.max(page, 1);
        const skip = (safePage - 1) * safePageSize;
        const [runningSections, total] = await Promise.all([
            this.prisma.runningSection.findMany({
                skip,
                take: safePageSize,
                orderBy: { startTime: 'desc' },
            }),
            this.prisma.runningSection.count(),
        ]);
        return {
            data: runningSections,
            total,
            totalPages: Math.ceil(total / safePageSize),
            currentPage: safePage,
        };
    }

    async getRunningSectionById(id: string) {
        return this.prisma.runningSection.findUnique({
            where: { id },
        });
    }

    async createRunningSection(sectionInfo: runningSectionCreateDto) {
        const classRecord = await this.prisma.class.findUnique({
            where: { id: sectionInfo.classId },
        });

        if (!classRecord) {
            throw new NotFoundException(
                `Class ${sectionInfo.classId} not found`,
            );
        }

        return this.prisma.runningSection.create({
            data: {
                name: sectionInfo.name,
                classId: classRecord.id,
                className: classRecord.name,
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

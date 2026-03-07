import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SectionsService } from './sections.service';
import {
    sectionCreateDto,
    sectionUpdateDto,
    sectionTransferDto,
    runningSectionCreateDto,
} from '../../dtos/section-dtos';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from 'dtos/common-dtos';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
    constructor(private readonly sectionsService: SectionsService) {}

    @Get('/page')
    async getSectionPage(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string = '3',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 3;
        return this.sectionsService.getSections(pageNum, size);
    }

    @Get('/class/:classId')
    async getSectionsByClassId(
        @Param('classId') classId: string,
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '200',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 200;
        return this.sectionsService.getSectionsByClassId(
            classId,
            pageNum,
            size,
        );
    }

    @Get('/:id')
    async getSectionById(@Param('id') id: string) {
        return this.sectionsService.getSectionById(id);
    }

    @Post('/create')
    async createSection(@Body() sectionInfo: sectionCreateDto) {
        return this.sectionsService.createSection(sectionInfo);
    }

    @Post('/update')
    async updateSection(@Body() sectionInfo: sectionUpdateDto) {
        return this.sectionsService.updateSection(sectionInfo);
    }

    @Post('/delete')
    async deleteSection(@Body() payload: IdDto) {
        return this.sectionsService.deleteSection(payload.id);
    }

    @Post('/transfer')
    async transferRunningSection(
        @Body() runningSectionInfo: sectionTransferDto,
    ) {
        return this.sectionsService.createSectionFromRunningSection(
            runningSectionInfo,
        );
    }

    @Get('/running/page')
    async getRunningSectionPage(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string = '3',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 3;
        return this.sectionsService.getRunningSections(pageNum, size);
    }

    @Get('/running/:id')
    async getRunningSectionById(@Param('id') id: string) {
        return this.sectionsService.getRunningSectionById(id);
    }

    @Post('/running/create')
    async createRunningSection(@Body() sectionInfo: runningSectionCreateDto) {
        return this.sectionsService.createRunningSection(sectionInfo);
    }

    @Post('/running/remove')
    async removeRunningSection(@Body() payload: IdDto) {
        return this.sectionsService.removeRunningSection(payload.id);
    }
}

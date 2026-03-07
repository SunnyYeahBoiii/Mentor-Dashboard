import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClassService } from './classes.service';
import { classCreateDto } from '../../dtos/class-dtos';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from 'dtos/common-dtos';
import { UpdateClassDto } from 'dtos/update-dtos';

@ApiTags('classes')
@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Get('/list')
    async getClassList(
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '200',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 200;
        return this.classService.getClassList(pageNum, size);
    }

    @Get('/page')
    async getClassPage(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string = '3',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 3;
        return this.classService.getClassPage(pageNum, size);
    }

    @Get('/total-pages')
    async getClassTotalPages(@Query('pageSize') pageSize: string = '3') {
        const size = parseInt(pageSize) || 3;
        return this.classService.getClassTotalPages(size);
    }

    @Get('/:id')
    async getClassById(@Param('id') id: string) {
        return this.classService.getClassById(id);
    }

    @Post('/add-class')
    async createClass(@Body() classInfo: classCreateDto) {
        return this.classService.createClass(classInfo);
    }

    @Post('/delete-class')
    async deleteClass(@Body() payload: IdDto) {
        return this.classService.deleteClass(payload.id);
    }

    @Post('/edit-class')
    async editClass(@Body() payload: UpdateClassDto) {
        return this.classService.editClass(payload.id, payload.data);
    }
}

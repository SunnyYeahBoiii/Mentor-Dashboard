import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { ApiTags } from '@nestjs/swagger';
import { AssignStudentToClassDto } from '../../dtos/student-class-dtos';

@ApiTags('student-class')
@Controller('student-class')
export class StudentClassController {
    constructor(private readonly studentClassService: StudentClassService) {}

    @Get('/class/:classId/students')
    async getStudentInClass(
        @Param('classId') classId: string,
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '200',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 200;
        return this.studentClassService.getStudentInClass(
            classId,
            pageNum,
            size,
        );
    }

    @Get('/class/:classId/not-in-class')
    async getStudentNotInClass(
        @Param('classId') classId: string,
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '200',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 200;
        return this.studentClassService.getStudentNotInClass(
            classId,
            pageNum,
            size,
        );
    }

    @Post('/add-student-to-class')
    async addStudentToClass(@Body() data: AssignStudentToClassDto) {
        return this.studentClassService.addStudentToClass(
            data.studentId,
            data.classId,
        );
    }

    @Post('/remove-student-from-class')
    async removeStudentFromClass(@Body() data: AssignStudentToClassDto) {
        return this.studentClassService.removeStudentFromClass(
            data.studentId,
            data.classId,
        );
    }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { studentCreateDto } from 'dtos/student-dtos';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from 'dtos/common-dtos';
import { UpdateStudentDto } from 'dtos/update-dtos';

@ApiTags('students')
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get('/page')
    async getStudentPage(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string = '8',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 8;
        return this.studentService.getStudentPage(pageNum, size);
    }

    @Get('/total-pages')
    async getStudentTotalPages(@Query('pageSize') pageSize: string = '8') {
        const size = parseInt(pageSize) || 8;
        return this.studentService.getStudentTotalPages(size);
    }

    @Get('/:id')
    async getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(id);
    }

    @Get('/all')
    async getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @Post('/add-student')
    async createStudent(@Body() student: studentCreateDto) {
        return this.studentService.createStudent(student);
    }

    @Post('/delete-student')
    async deleteStudent(@Body() payload: IdDto) {
        return this.studentService.deleteStudent(payload.id);
    }

    @Post('/edit-student')
    async editStudent(@Body() payload: UpdateStudentDto) {
        return this.studentService.editStudent(payload.id, payload.data);
    }

    @Get('/with-section-count')
    async getStudentsWithSectionCount() {
        return this.studentService.getStudentsWithSectionCount();
    }
}

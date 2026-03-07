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

    @Get('/all')
    async getAllStudents(
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '200',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 200;
        return this.studentService.getAllStudents(pageNum, size);
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
    async getAllPayment(
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '200',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 200;
        return this.studentService.getAllPayment(pageNum, size);
    }

    @Get('/payment-page')
    async getPaymentPage(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string = '8',
    ) {
        const pageNum = parseInt(page) || 1;
        const size = parseInt(pageSize) || 8;
        return this.studentService.getPaymentPage(pageNum, size);
    }

    @Get('/payment-total-pages')
    async getPaymentTotalPages(@Query('pageSize') pageSize: string = '8') {
        const size = parseInt(pageSize) || 8;
        return this.studentService.getPaymentTotalPages(size);
    }

    @Get('/payment/:studentId')
    async getStudentPayment(@Param('studentId') studentId: string) {
        return this.studentService.getStudentPayment(studentId);
    }

    @Post('/payment/:studentId')
    async paymentApply(
        @Param('studentId') studentId: string,
        @Body() data: any,
    ) {
        return this.studentService.studentPaySections(
            studentId,
            data.section_paid,
            data.tuition_paid,
        );
    }

    @Get('/:id')
    async getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(id);
    }
}

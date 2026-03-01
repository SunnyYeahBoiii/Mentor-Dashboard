import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { ApiTags } from '@nestjs/swagger';
import { AssignStudentToClassDto } from '../../dtos/student-class-dtos';

@ApiTags('student-class')
@Controller('student-class')
export class StudentClassController {
    constructor(private readonly studentClassService: StudentClassService) {}

    @Get('/class/:classId/students')
    async getStudentInClass(@Param('classId') classId: string) {
        return this.studentClassService.getStudentInClass(classId);
    }

    @Get('/class/:classId/not-in-class')
    async getStudentNotInClass(@Param('classId') classId: string) {
        return this.studentClassService.getStudentNotInClass(classId);
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

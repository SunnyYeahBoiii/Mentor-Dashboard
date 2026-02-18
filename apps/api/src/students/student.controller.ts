import { Body, Controller, Get, Post } from "@nestjs/common";
import { StudentService } from "./student.service";
import { studentCreateDto } from "dtos/student-dtos";
import { ApiTags } from "@nestjs/swagger";
import { IdDto } from "dtos/common-dtos";
import { UpdateStudentDto } from "dtos/update-dtos";

@ApiTags('students')
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

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
}
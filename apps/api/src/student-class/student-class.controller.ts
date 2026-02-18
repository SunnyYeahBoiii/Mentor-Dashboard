import { Body, Controller, Post } from "@nestjs/common";
import { StudentClassService } from "./student-class.service";
import { ApiTags } from "@nestjs/swagger";
import { AssignStudentToClassDto } from "../../dtos/student-class-dtos";

@ApiTags('student-class')
@Controller('student-class')
export class StudentClassController {
    constructor(private readonly studentClassService: StudentClassService) { }

    @Post('/add-student-to-class')
    async addStudentToClass(@Body() data: AssignStudentToClassDto) {
        return this.studentClassService.addStudentToClass(data.studentId, data.classId);
    }

    @Post('/remove-student-from-class')
    async removeStudentFromClass(@Body() data: AssignStudentToClassDto) {
        return this.studentClassService.removeStudentFromClass(data.studentId, data.classId);
    }
}
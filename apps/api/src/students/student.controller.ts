import { Controller, Get, Post } from "@nestjs/common";

@Controller('students')
export class StudentController {
    @Post()
    async createStudent() {
        return "Student created";
    }
}
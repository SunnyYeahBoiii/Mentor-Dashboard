import { Body, Controller, Post } from "@nestjs/common";
import { ClassService } from "./classes.service";
import { classCreateDto } from "../../dtos/class-dtos";
import { ApiTags } from "@nestjs/swagger";
import { IdDto } from "dtos/common-dtos";
import { UpdateClassDto } from "dtos/update-dtos";


@ApiTags('classes')
@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) { }

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
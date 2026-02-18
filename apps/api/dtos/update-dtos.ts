import { ApiProperty } from '@nestjs/swagger';
import { studentCreateDto } from './student-dtos';
import { classCreateDto } from './class-dtos';

export class UpdateStudentDto {
    @ApiProperty({ description: 'The ID of the student to update' })
    id: string;

    @ApiProperty({ type: studentCreateDto })
    data: studentCreateDto;
}

export class UpdateClassDto {
    @ApiProperty({ description: 'The ID of the class to update' })
    id: string;

    @ApiProperty({ type: classCreateDto })
    data: classCreateDto;
}

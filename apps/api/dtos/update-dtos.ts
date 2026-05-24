import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { studentCreateDto } from './student-dtos';
import { classCreateDto } from './class-dtos';

export class UpdateStudentDto {
    @ApiProperty({ description: 'The ID of the student to update' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ type: studentCreateDto })
    @ValidateNested()
    @Type(() => studentCreateDto)
    data: studentCreateDto;
}

export class UpdateClassDto {
    @ApiProperty({ description: 'The ID of the class to update' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ type: classCreateDto })
    @ValidateNested()
    @Type(() => classCreateDto)
    data: classCreateDto;
}

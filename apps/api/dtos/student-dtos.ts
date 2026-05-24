import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class studentCreateDto {
    @ApiProperty({
        description: 'The first name of the student',
        example: 'John',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'The middle name of the student',
        example: 'Doe',
    })
    @IsString()
    middleName: string;

    @ApiProperty({
        description: 'The last name of the student',
        example: 'Doe',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'The birth year of the student',
        required: false,
        example: 2000,
    })
    @IsOptional()
    @IsNumber()
    birthyear?: number;

    @ApiProperty({
        description: 'The school of the student',
        required: false,
        example: 'High School A',
    })
    @IsOptional()
    @IsString()
    school?: string;

    @ApiProperty({
        description: 'The province where the student resides',
        required: false,
        example: 'TP HCM',
    })
    @IsOptional()
    @IsString()
    province?: string;
}

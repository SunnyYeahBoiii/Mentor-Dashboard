import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

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

export class PaymentApplyDto {
    @ApiProperty({
        description: 'Number of newly paid sections',
        example: 1,
        minimum: 0,
    })
    @IsInt()
    @Min(0)
    section_paid: number;

    @ApiProperty({
        description: 'Additional tuition paid in integer currency units',
        example: 150000,
        minimum: 0,
    })
    @IsInt()
    @Min(0)
    tuition_paid: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class studentCreateDto {
    @ApiProperty({
        description: 'The full name of the student',
        example: 'John Doe'
    })
    firstName: string;

    @ApiProperty({
        description: 'The middle name of the student',
        example: 'Doe'
    })
    middleName: string;

    @ApiProperty({
        description: 'The last name of the student',
        example: 'Doe'
    })
    lastName: string;

    @ApiProperty({
        description: 'The age of the student',
        required: false,
        example: 20
    })
    age?: number;

    @ApiProperty({
        description: 'The province where the student resides',
        required: false,
        example: 'TP HCM'
    })
    province?: string;

    @ApiProperty({
        description: 'The current grade level of the student',
        required: false,
        example: '12'
    })
    grade?: string;
}
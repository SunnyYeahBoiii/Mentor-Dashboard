import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignStudentToClassDto {
    @ApiProperty({
        description: 'The unique ID of the student',
        example: 'student-123',
    })
    @IsString()
    @IsNotEmpty()
    studentId: string;

    @ApiProperty({
        description: 'The unique ID of the class',
        example: 'class-456',
    })
    @IsString()
    @IsNotEmpty()
    classId: string;
}

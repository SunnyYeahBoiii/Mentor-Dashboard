import { ApiProperty } from '@nestjs/swagger';

export class AssignStudentToClassDto {
    @ApiProperty({
        description: 'The unique ID of the student',
        example: 'student-123'
    })
    studentId: string;

    @ApiProperty({
        description: 'The unique ID of the class',
        example: 'class-456'
    })
    classId: string;
}

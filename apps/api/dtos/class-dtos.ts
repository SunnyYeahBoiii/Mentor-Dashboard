import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class classCreateDto {
    @ApiProperty({
        description: 'The name of the class',
        example: 'Mathematics 101',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The fee charged for this section',
        example: 150.0,
    })
    @IsInt()
    @Min(0)
    section_fee: number;
}

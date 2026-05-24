import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

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
    @IsNumber()
    section_fee: number;

    @ApiProperty({
        description: 'The total number of sections available',
        required: false,
        example: 5,
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    section_count?: number;
}

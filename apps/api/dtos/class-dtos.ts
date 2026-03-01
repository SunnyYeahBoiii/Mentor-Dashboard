import { ApiProperty } from '@nestjs/swagger';

export class classCreateDto {
    @ApiProperty({
        description: 'The name of the class',
        example: 'Mathematics 101',
    })
    name: string;

    @ApiProperty({
        description: 'The fee charged for this section',
        example: 150.0,
    })
    section_fee: number;

    @ApiProperty({
        description: 'The total number of sections available',
        required: false,
        example: 5,
        default: 0,
    })
    section_count?: number;
}

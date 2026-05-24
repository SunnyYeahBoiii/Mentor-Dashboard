import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IdDto {
    @ApiProperty({
        description: 'The unique Prisma CUID identifier',
        example: 'clx123abc0000abcd1234efgh',
    })
    @IsString()
    @IsNotEmpty()
    id: string;
}

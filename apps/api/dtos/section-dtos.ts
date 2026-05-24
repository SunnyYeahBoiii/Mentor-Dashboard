import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class sectionCreateDto {
    @ApiProperty({
        description: 'The name of the section',
        example: 'Math Section A',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The class ID this section belongs to',
        example: 'class-123',
    })
    @IsString()
    classId: string;

    @ApiProperty({
        description: 'The name of the class',
        example: 'Math',
    })
    @IsString()
    className: string;

    @ApiProperty({
        description: 'The start time of the section',
        required: false,
        example: '2024-01-01T09:00:00Z',
    })
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @ApiProperty({
        description: 'The end time of the section',
        required: false,
        example: '2024-01-01T10:30:00Z',
    })
    @IsOptional()
    @IsDateString()
    endTime?: Date;
}

export class sectionInfoDto {
    @ApiProperty({
        description: 'The ID of the section',
        example: 'section-123',
    })
    id: string;

    @ApiProperty({
        description: 'The name of the section',
        example: 'Math Section A',
    })
    name: string;

    @ApiProperty({
        description: 'The class ID this section belongs to',
        example: 'class-123',
    })
    classId: string;

    @ApiProperty({
        description: 'The start time of the section',
        required: false,
        example: '2024-01-01T09:00:00Z',
    })
    startTime?: Date;

    @ApiProperty({
        description: 'The end time of the section',
        required: false,
        example: '2024-01-01T10:30:00Z',
    })
    endTime?: Date;
}

export class sectionUpdateDto {
    @ApiProperty({
        description: 'The ID of the section',
        example: 'section-123',
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The name of the section',
        example: 'Math Section A',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The class ID this section belongs to',
        example: 'class-123',
    })
    @IsString()
    classId: string;

    @ApiProperty({
        description: 'The name of the class',
        example: 'Math',
    })
    @IsString()
    className: string;

    @ApiProperty({
        description: 'The start time of the section',
        required: false,
        example: '2024-01-01T09:00:00Z',
    })
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @ApiProperty({
        description: 'The end time of the section',
        required: false,
        example: '2024-01-01T10:30:00Z',
    })
    @IsOptional()
    @IsDateString()
    endTime?: Date;
}

export class sectionTransferDto {
    @ApiProperty({
        description: 'The ID of the running section to transfer',
        example: 'running-123',
    })
    @IsString()
    runningId: string;

    @ApiProperty({
        description: 'The name of the section',
        example: 'Math Section A',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The class ID this section belongs to',
        example: 'class-123',
    })
    @IsString()
    classId: string;

    @ApiProperty({
        description: 'The name of the class',
        example: 'Math',
    })
    @IsString()
    className: string;

    @ApiProperty({
        description: 'The start time of the section',
        required: false,
        example: '2024-01-01T09:00:00Z',
    })
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @ApiProperty({
        description: 'The end time of the section',
        required: false,
        example: '2024-01-01T10:30:00Z',
    })
    @IsOptional()
    @IsDateString()
    endTime?: Date;
}

export class runningSectionCreateDto {
    @ApiProperty({
        description: 'The name of the running section',
        example: 'Math Running Section',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The class ID this running section belongs to',
        example: 'class-123',
    })
    @IsString()
    classId: string;

    @ApiProperty({
        description: 'The meeting link for the running section',
        example: 'https://meet.google.com/abc-defg-hij',
    })
    @IsString()
    meetingLink: string;

    @ApiProperty({
        description: 'The name of the class',
        example: 'Math',
    })
    @IsString()
    className: string;
}

export class runningSectionInfoDto {
    @ApiProperty({
        description: 'The ID of the running section',
        example: 'running-123',
    })
    id: string;

    @ApiProperty({
        description: 'The name of the running section',
        example: 'Math Running Section',
    })
    name: string;

    @ApiProperty({
        description: 'The class ID this running section belongs to',
        example: 'class-123',
    })
    classId: string;

    @ApiProperty({
        description: 'The start time of the running section',
        required: false,
        example: '2024-01-01T09:00:00Z',
    })
    startTime?: Date;

    @ApiProperty({
        description: 'The meeting link for the running section',
        required: false,
        example: 'https://meet.google.com/abc-defg-hij',
    })
    meetingLink?: string;
}

export class sectionEndDto {
    @ApiProperty({
        description: 'The ID of the running section to end',
        example: 'running-123',
    })
    @IsString()
    id: string;
}

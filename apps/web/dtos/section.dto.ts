export interface sectionCreateDto {
    name: string;
    classId: string;
    startTime: Date;
    endTime: Date;
}

export interface sectionEndDto {
    id: string;
    name: string;
    classId: string;
    startTime?: Date;
    endTime?: Date;
}

export interface sectionUpdateDto extends sectionCreateDto {
    id: string;
}
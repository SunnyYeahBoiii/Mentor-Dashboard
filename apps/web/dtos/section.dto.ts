export interface sectionCreateDto {
    name: string;
    classId: string;
    startTime: Date;
    endTime?: Date;
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

export interface sectionInfoDto extends sectionCreateDto {
    id: string;
}

export interface runningSectionCreateDto {
    name: string;
    classId: string;
}

export interface runningSectionInfoDto extends runningSectionCreateDto {
    id: string;
    meetingLink: string;
    startTime: Date;
}

export interface sectionTransferDto {
    runningId: string;
    name: string;
    classId: string;
    startTime: Date;
    endTime: Date;
}
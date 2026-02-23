export interface classInfoCreateDto {
    id: string;
    name: string;
    section_fee: number;
    section_count: number;
    students_count: number;
}

export interface classCreateDto {
    name: string;
    section_fee: number;
}
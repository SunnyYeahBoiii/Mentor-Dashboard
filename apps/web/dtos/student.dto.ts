export interface studentCreateDto {
    firstName: string;
    middleName: string;
    lastName: string;
    province: string;
    school: string;
    birthyear: number;
}

export interface studentDto extends studentCreateDto {
    id: string;
    paid_sections: number;
    amount_paid: number;
}
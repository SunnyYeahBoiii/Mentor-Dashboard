import { studentDto } from "./student.dto";

export interface paymentDto extends studentDto {
    section_count: number;
    section_fee: number;
    total_fee: number;
}
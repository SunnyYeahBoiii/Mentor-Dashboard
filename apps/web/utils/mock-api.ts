import { students } from "./mock-data";

export function getStudentPage(pageNumber: number) {
    return students.slice((pageNumber - 1) * 8, pageNumber * 8);
}

export function getTotalPages() {
    return Math.ceil(students.length / 8);
}
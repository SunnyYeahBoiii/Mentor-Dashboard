import { studentCreateDto } from "@/dtos/student.dto";
import { students } from "./mock-data";
import { classes } from "./mock-data";

const NUMBER_STUDENT_PER_PAGE = 8
const NUMBER_CLASS_PER_PAGE = 3

export function getStudentPage(pageNumber: number) {
    return students.slice((pageNumber - 1) * NUMBER_STUDENT_PER_PAGE, pageNumber * NUMBER_STUDENT_PER_PAGE);
}

export function getStudentTotalPages() {
    return Math.ceil(students.length / NUMBER_STUDENT_PER_PAGE);
}

export function getStudentById(id: string) {
    if (id === "None")
        return null;
    return students.find((student) => student.id === id);
}

export async function updateStudent(student: studentCreateDto) {
    return students.filter((s) => s.id === student.id).map((s) => {
        s.firstName = student.firstName;
        s.middleName = student.middleName;
        s.lastName = student.lastName;
        s.birthyear = student.birthyear;
        s.school = student.school;
        s.province = student.province;
    });
}

export async function createStudent(student: studentCreateDto) {
    students.push(student);
    return students[students.length - 1];
}

export function getClassPage(pageNumber: number) {
    return classes.slice((pageNumber - 1) * NUMBER_CLASS_PER_PAGE, pageNumber * NUMBER_CLASS_PER_PAGE);
}

export function getClassTotalPages() {
    return Math.ceil(classes.length / NUMBER_CLASS_PER_PAGE);
}
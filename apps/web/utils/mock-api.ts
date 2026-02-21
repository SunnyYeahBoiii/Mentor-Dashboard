import { studentCreateDto } from "@/dtos/student.dto";
import { classInfoCreateDto } from "@/dtos/class.dto";
import { students, studentInClasses } from "./mock-data";
import { classes } from "./mock-data";
import { sessions as sections } from "./mock-data";
import { sectionCreateDto, sectionEndDto, sectionUpdateDto } from "@/dtos/section.dto";

const NUMBER_STUDENT_PER_PAGE = 8
const NUMBER_CLASS_PER_PAGE = 3
const NUMBER_SECTION_PER_PAGE = 3
const NUMBER_RUNNING_SECTION_PER_PAGE = 4

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

export function getClassById(id: string) {
    if (id === "None")
        return null;
    return classes.find((c) => c.id === id);
}

export async function createClass(newClass: classInfoCreateDto) {
    classes.push(newClass);
    return classes[classes.length - 1];
}

export async function updateClass(newClass: classInfoCreateDto) {
    return classes.filter((c) => c.id === newClass.id).map((c) => {
        c.name = newClass.name;
        c.section_count = newClass.section_count;
        c.section_fee = newClass.section_fee;
        c.students_count = newClass.students_count;
    });
}

export const getStudentInClass = (classId: string) => {
    const studentList = studentInClasses.filter((student) => student.classId === classId);
    const studentIds = studentList.map((student) => student.studentId);
    return students.filter((student) => studentIds.includes(student.id));
}

export const getSectionPage = (page: number) => {
    return sections.filter((section) => section.endTime).slice((page - 1) * NUMBER_SECTION_PER_PAGE, page * NUMBER_SECTION_PER_PAGE);
}

export const getSectionTotalPages = () => {
    return Math.ceil(sections.filter((section) => section.endTime).length / NUMBER_SECTION_PER_PAGE);
}

export const getRunningSectionPage = (page: number) => {
    return sections.filter((section) => !section.endTime).slice((page - 1) * NUMBER_RUNNING_SECTION_PER_PAGE, page * NUMBER_RUNNING_SECTION_PER_PAGE);
}

export const getRunningSectionTotalPages = () => {
    return Math.ceil(sections.filter((section) => !section.endTime).length / NUMBER_RUNNING_SECTION_PER_PAGE);
}

export const getSectionById = (id: string) => {
    return sections.find((section) => section.id === id);
}

export const updateSectionById = async (section: sectionUpdateDto) => {
    return sections.filter((s) => s.id === section.id).map((s) => {
        s.name = section.name;
        s.classId = section.classId;
        s.startTime = new Date(section.startTime).toISOString();
        s.endTime = new Date(section.endTime).toISOString();
    });
}
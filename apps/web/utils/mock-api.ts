import { studentCreateDto } from "@/dtos/student.dto";
import { classCreateDto, classInfoCreateDto } from "@/dtos/class.dto";
import { students, studentInClasses, runningSessions } from "./mock-data";
import { classes } from "./mock-data";
import { sessions as sections } from "./mock-data";
import { runningSectionCreateDto, runningSectionInfoDto, sectionCreateDto, sectionEndDto, sectionInfoDto, sectionTransferDto, sectionUpdateDto } from "@/dtos/section.dto";
import axios from "axios";
import { createMeet } from "./api";

const NUMBER_STUDENT_PER_PAGE = 8
const NUMBER_CLASS_PER_PAGE = 3
const NUMBER_SECTION_PER_PAGE = 3
const NUMBER_RUNNING_SECTION_PER_PAGE = 3

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

export async function getAllStudent() {
    return students.map((s) => {
        return {
            id: s.id,
            name: s.firstName + " " + s.middleName + " " + s.lastName,
        };
    });
}

export async function deleteStudentById(id: string) {
    students.splice(students.findIndex((s) => s.id === id), 1);
}

export async function deleteClassById(id: string) {
    classes.splice(classes.findIndex((c) => c.id === id), 1);
}

export async function deleteSectionById(id: string) {
    sections.splice(sections.findIndex((s) => s.id === id), 1);
}

export async function deleteRunningSectionById(id: string) {
    runningSessions.splice(runningSessions.findIndex((s) => s.id === id), 1);
}

export function getStudentNotInClass(classId: string) {
    const studentList = studentInClasses.filter((student) => student.classId === classId);
    const studentIds = studentList.map((student) => student.studentId);
    return students.filter((student) => !studentIds.includes(student.id));
}

export function getClassList() {
    return classes.map((c) => {
        return {
            id: c.id,
            name: c.name,
        };
    });
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

export async function createClass(newClass: classCreateDto) {
    classes.push({
        id: crypto.randomUUID(),
        ...newClass,
        section_count: 0,
        students_count: 0,
    });
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
    return sections.slice((page - 1) * NUMBER_SECTION_PER_PAGE, page * NUMBER_SECTION_PER_PAGE);
}

export const getSectionTotalPages = () => {
    return Math.ceil(sections.length / NUMBER_SECTION_PER_PAGE);
}

export const getRunningSectionPage = (page: number) => {
    return runningSessions.slice((page - 1) * NUMBER_RUNNING_SECTION_PER_PAGE, page * NUMBER_RUNNING_SECTION_PER_PAGE);
}

export const createSection = async (sectionInfo: sectionCreateDto) => {
    const newSection = {
        id: crypto.randomUUID(),
        ...sectionInfo,
    }

    sections.push(newSection);
    return newSection;
}

export const createSectionFromRunningSection = async (runningSectionInfo: sectionTransferDto) => {
    const newSection = {
        id: crypto.randomUUID(),
        name: runningSectionInfo.name,
        classId: runningSectionInfo.classId,
        startTime: runningSectionInfo.startTime,
        endTime: runningSectionInfo.endTime,
    }

    sections.push(newSection);
    removeRunningSectionById(runningSectionInfo.runningId);
    return newSection;
}

export const getRunningSectionTotalPages = () => {
    return Math.ceil(runningSessions.length / NUMBER_RUNNING_SECTION_PER_PAGE);
}

export const getSectionById = (id: string) => {
    return sections.find((section) => section.id === id);
}

export const getRunningSectionById = (id: string) => {
    return runningSessions.find((section) => section.id === id);
}

export const getSectionByClassId = (classId: string) => {
    return sections.filter((section) => section.classId === classId);
}

export const updateSectionById = async (section: sectionUpdateDto) => {
    return sections.filter((s) => s.id === section.id).map((s) => {
        s.name = section.name;
        s.classId = section.classId;
        s.startTime = section.startTime;
        s.endTime = section.endTime;
    });
}

export const createRunningSection = async (sectionInfo: runningSectionCreateDto) => {
    const newRunningSection = {
        id: crypto.randomUUID(),
        ...sectionInfo,
        startTime: new Date(),
        meetingLink: await createMeet(),
    }

    runningSessions.push(newRunningSection)
    return newRunningSection
}

export const removeRunningSectionById = async (id: string) => {
    const object = runningSessions.find(section => section.id == id)
    if (!object) return;
    const index = runningSessions.indexOf(object)
    runningSessions.splice(index, 1)
}

export const addStudentToClass = async (classId: string, studentId: string) => {
    const newStudentInClass = {
        classId,
        studentId,
    }
    studentInClasses.push(newStudentInClass);
    const classObj = classes.find((c) => c.id === classId);
    if (classObj) {
        classObj.students_count++;
    }
    return newStudentInClass;
}
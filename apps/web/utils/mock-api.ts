import { studentCreateDto, studentDto } from "@/dtos/student.dto";
import { paymentDto } from "@/dtos/payment.dto";
import {
  classCreateDto,
  classUpdateDto,
} from "@/dtos/class.dto";
import {
  runningSectionCreateDto,
  sectionCreateDto,
  sectionTransferDto,
  sectionUpdateDto,
} from "@/dtos/section.dto";
import { api } from "./client";

const NUMBER_STUDENT_PER_PAGE = 8;
const NUMBER_CLASS_PER_PAGE = 3;
const NUMBER_SECTION_PER_PAGE = 3;
const NUMBER_RUNNING_SECTION_PER_PAGE = 3;

export async function getStudentPage(pageNumber: number) {
  const response = await api.get(
    `/students/page?page=${pageNumber}&pageSize=${NUMBER_STUDENT_PER_PAGE}`,
  );
  return response.data.data;
}

export async function getStudentTotalPages() {
  const response = await api.get(
    `/students/total-pages?pageSize=${NUMBER_STUDENT_PER_PAGE}`,
  );
  return response.data;
}

export async function getStudentById(id: string) {
  if (id === "None") return null;
  const response = await api.get(`/students/${id}`);
  return response.data;
}

export async function updateStudent(student: studentDto) {
  const response = await api.post("/students/edit-student", {
    id: student.id,
    data: student,
  });
  return response.data;
}

export async function createStudent(student: studentCreateDto) {
  const response = await api.post("/students/add-student", student);
  return response.data;
}

export async function getAllStudent() {
  const response = await api.get("/students/all");
  return response.data;
}

export async function deleteStudentById(id: string) {
  const response = await api.post("/students/delete-student", { id });
  return response.data;
}

export async function deleteClassById(id: string) {
  const response = await api.post("/classes/delete-class", { id });
  return response.data;
}

export async function deleteSectionById(id: string) {
  const response = await api.post("/sections/delete", { id });
  return response.data;
}

export async function deleteRunningSectionById(id: string) {
  const response = await api.post("/sections/running/remove", { id });
  return response.data;
}

export async function getStudentNotInClass(classId: string) {
  const response = await api.get(
    `/student-class/class/${classId}/not-in-class`,
  );
  return response.data;
}

export async function getClassList() {
  const response = await api.get("/classes/list");
  return response.data;
}

export async function getClassPage(pageNumber: number) {
  const response = await api.get(
    `/classes/page?page=${pageNumber}&pageSize=${NUMBER_CLASS_PER_PAGE}`,
  );
  return response.data.data;
}

export async function getClassTotalPages() {
  const response = await api.get(
    `/classes/total-pages?pageSize=${NUMBER_CLASS_PER_PAGE}`,
  );
  return response.data;
}

export async function getClassById(id: string) {
  if (id === "None") return null;
  const response = await api.get(`/classes/${id}`);
  return response.data;
}

export async function createClass(newClass: classCreateDto) {
  const response = await api.post("/classes/add-class", {
    ...newClass,
    section_count: 0,
    students_count: 0,
  });
  return response.data;
}

export async function updateClass(newClass: classUpdateDto) {
  const response = await api.post("/classes/edit-class", {
    id: newClass.id,
    data: newClass,
  });
  return response.data;
}

export async function getStudentInClass(classId: string) {
  const response = await api.get(`/student-class/class/${classId}/students`);
  return response.data;
}

export async function getSectionPage(page: number) {
  const response = await api.get(
    `/sections/page?page=${page}&pageSize=${NUMBER_SECTION_PER_PAGE}`,
  );
  return response.data.data;
}

export async function getSectionTotalPages() {
  const response = await api.get(
    `/sections/page?page=1&pageSize=${NUMBER_SECTION_PER_PAGE}`,
  );
  return response.data.totalPages;
}

export async function getRunningSectionPage(page: number) {
  const response = await api.get(
    `/sections/running/page?page=${page}&pageSize=${NUMBER_RUNNING_SECTION_PER_PAGE}`,
  );
  return response.data.data;
}

export async function createSection(sectionInfo: sectionCreateDto) {
  const response = await api.post("/sections/create", sectionInfo);
  return response.data;
}

export async function createSectionFromRunningSection(
  runningSectionInfo: sectionTransferDto,
) {
  const response = await api.post("/sections/transfer", runningSectionInfo);
  return response.data;
}

export async function getRunningSectionTotalPages() {
  const response = await api.get(
    `/sections/running/page?page=1&pageSize=${NUMBER_RUNNING_SECTION_PER_PAGE}`,
  );
  return response.data.totalPages;
}

export async function getSectionById(id: string) {
  const response = await api.get(`/sections/${id}`);
  return response.data;
}

export async function getRunningSectionById(id: string) {
  const response = await api.get(`/sections/running/${id}`);
  return response.data;
}

export async function getSectionByClassId(classId: string) {
  const response = await api.get(`/sections/class/${classId}`);
  return response.data;
}

export async function updateSectionById(section: sectionUpdateDto) {
  const response = await api.post("/sections/update", section);
  return response.data;
}

export async function createRunningSection(
  sectionInfo: runningSectionCreateDto,
) {
  const response = await api.post("/sections/running/create", sectionInfo);
  return response.data;
}

export async function removeRunningSectionById(id: string) {
  const response = await api.post("/sections/running/remove", { id });
  return response.data;
}

export async function addStudentToClass(classId: string, studentId: string) {
  const response = await api.post("/student-class/add-student-to-class", {
    classId,
    studentId,
  });
  return response.data;
}

export async function removeStudentToClass(classId: string, studentId: string) {
  const response = await api.post("/student-class/remove-student-from-class", {
    classId,
    studentId,
  });
  return response.data;
}

export async function getPaymentPage(pageNumber: number) {
  const response = await api.get(
    `/students/payment-page?page=${pageNumber}&pageSize=${NUMBER_STUDENT_PER_PAGE}`,
  );
  return response.data.data;
}

export async function getPaymentTotalPages() {
  const response = await api.get(
    `/students/payment-total-pages?pageSize=${NUMBER_STUDENT_PER_PAGE}`,
  );
  return response.data;
}

export async function getStudentPayment(studentId: string): Promise<paymentDto> {
  const response = await api.get(`/students/payment/${studentId}`);
  return response.data[0];
}

export async function paymentApply(studentId: string, section_paid: number) {
  const response = await api.post(`/students/payment/${studentId}`, { section_paid });
  return response.data;
}
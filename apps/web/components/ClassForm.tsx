"use client";
import {
  classCreateDto,
  classInfoCreateDto,
  classUpdateDto,
} from "@/dtos/class.dto";
import { studentCreateDto, studentDto } from "@/dtos/student.dto";
import { sectionInfoDto } from "@/dtos/section.dto";
import {
  getClassById,
  createClass,
  updateClass,
  getStudentInClass,
  getAllStudent,
  getStudentNotInClass,
  addStudentToClass,
  getSectionByClassId,
  removeStudentToClass,
} from "@/utils/mock-api";
import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { formatDateTimeLocal } from "@/utils/funcs";

interface classFormProps {
  class_id: string;
}

const classDetailsOptions = (class_id: string) =>
  queryOptions({
    queryKey: ["classes", class_id],
    queryFn: () => getClassById(class_id),
  });

const classSectionOptions = (class_id: string) =>
  queryOptions({
    queryKey: ["classes", class_id, "sections"],
    queryFn: () => getSectionByClassId(class_id),
  });

const studentListOptions = (class_id: string) =>
  queryOptions({
    queryKey: ["students"],
    queryFn: () => getStudentNotInClass(class_id),
  });

export function ClassForm({ class_id }: classFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const isNewClass = class_id === "None";

  const {
    data: classInfo,
    isLoading,
    isError,
  } = useQuery({
    ...classDetailsOptions(class_id),
    enabled: !isNewClass,
  });

  const [name, setName] = useState<string>("");
  const [sectionCount, setSectionCount] = useState<string>("");
  const [sectionFee, setSectionFee] = useState<string>("");
  const [studentCount, setStudentCount] = useState<string>("");
  const [newStudentId, setNewStudent] = useState<string | null>("");

  useEffect(() => {
    if (classInfo) {
      setName(classInfo.name ?? "");
      setSectionCount(classInfo.section_count.toString() ?? "");
      setSectionFee(classInfo.section_fee.toString() ?? "");
      setStudentCount(classInfo.students_count.toString() ?? "");
    }
  }, [classInfo]);

  const { data: classSection } = useQuery(classSectionOptions(class_id));

  const updateMutation = useMutation({
    mutationFn: (updatedClass: classUpdateDto) => updateClass(updatedClass),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes", class_id],
      });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      router.push("/classes");
    },
  });

  const removeMutation = useMutation({
    mutationKey: ["students", "classes", class_id],
    mutationFn: (student_id: string) =>
      removeStudentToClass(class_id, student_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", class_id] });
      queryClient.invalidateQueries({
        queryKey: ["classes", class_id, "students"],
      });
      queryClient.invalidateQueries({
        queryKey: ["classes", class_id],
      });
    },
  });

  const { data: studentList, refetch: refetchStudent } = useQuery({
    queryKey: ["students", class_id],
    queryFn: () => getStudentInClass(class_id),
  });

  const { data: studentOutList } = useQuery(studentListOptions(class_id));

  const addStudentMutation = useMutation({
    mutationFn: (student_id: string) => addStudentToClass(class_id, student_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", class_id] });
      queryClient.invalidateQueries({
        queryKey: ["classes", class_id, "students"],
      });
      queryClient.invalidateQueries({
        queryKey: ["classes", class_id],
      });
    },
  });

  const handleSubmit = () => {
    const classInfo: classUpdateDto = {
      id: class_id,
      name,
      section_fee: parseInt(sectionFee),
    };

    updateMutation.mutate(classInfo);
  };

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addStudentMutation.mutate(newStudentId!);
  };

  const isPending = updateMutation.isPending;

  if (!isNewClass) {
    if (isLoading) {
      return (
        <div className="w-4/5 m-2 ml-0">
          <p className="animate-pulse">Loading class information...</p>
        </div>
      );
    }

    if (isError || !classInfo) {
      return (
        <div className="w-4/5 m-2 ml-0">
          <p className="text-red-500">
            Error: Could not find class with ID {class_id}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-500 hover:underline"
          >
            Return to class list
          </button>
        </div>
      );
    }
  }

  return (
    <div className="m-2 ml-0 flex flex-col justify-between bg-(--dark-white) p-2 pt-4 pb-4 rounded-xl gap-4">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex-1 bg-white px-2 py-1 rounded-sm">
          <p className="text-xs text-black/50">Tên</p>
          <input
            className="w-full outline-none"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 bg-white px-2 py-1 rounded-sm">
          <p className="text-xs text-black/50">Học phí theo buổi</p>
          <input
            className="w-full outline-none"
            type="text"
            value={sectionFee}
            onChange={(e) => setSectionFee(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex-1 h-60 bg-white px-2 py-1 rounded-sm">
            <p className="text-xs text-black/50">Danh sách buổi học </p>
            <p className="text-xs text-black/50">
              Tổng số buổi học: {classInfo?.section_count}
            </p>

            <div className="flex-1 overflow-y-scroll no-scrollbar">
              {classSection?.map((section: sectionInfoDto, index: number) => (
                <div
                  key={section.id}
                  className={`flex flex-row py-3 border-black/10  ${index < classSection.length - 1 ? "border-b" : "border-none"}`}
                >
                  <p className="w-[40%]">{section.name}</p>
                  <p className="w-[45%]">
                    {formatDateTimeLocal(section.endTime as Date)}
                  </p>
                  <p className="w-[15%] text-center flex flex-row justify-center items-center">
                    <Link href={`/students/${section.id}`}>
                      <FaEdit className="text-2xl px-1 py-1 text-black/50 hover:text-black cursor-pointer" />
                    </Link>
                    <FaTrash className="text-2xl px-1 py-1 bg-white text-black/50 hover:text-red-500 cursor-pointer" />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col h-60 bg-white px-2 py-1 rounded-sm">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="text-xs text-black/50">Danh sách học sinh</p>
                <p className="text-xs text-black/50">
                  Tổng số học sinh: {classInfo?.students_count}
                </p>
              </div>

              <form className="flex flex-row gap-2" onSubmit={handleAddStudent}>
                <Combobox
                  required
                  items={studentOutList}
                  itemToStringLabel={(item: studentDto) =>
                    `${item.firstName} ${item.middleName} ${item.lastName}`
                  }
                  onValueChange={(value: studentDto | null) => {
                    if (value) setNewStudent(value.id);
                  }}
                >
                  <ComboboxInput
                    required
                    className="py-1 outline-0"
                    placeholder="Thêm học sinh"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>Không tìm thấy học sinh</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item.id} value={item}>
                          {item.firstName} {item.middleName} {item.lastName}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>

                <button type="submit">
                  <FaPlus />
                </button>
              </form>
            </div>
            <div className="flex-1 overflow-y-scroll no-scrollbar">
              {studentList?.map((student: studentDto, index: number) => (
                <div
                  key={student.id}
                  className={`flex flex-row py-3 border-black/10  ${index < studentList.length - 1 ? "border-b" : "border-none"}`}
                >
                  <p className="w-[35%]">
                    {student.firstName} {student.middleName} {student.lastName}
                  </p>
                  <p className="w-[15%]">{student.birthyear}</p>
                  <p className="w-[35%]">{student.province}</p>
                  <p className="w-[15%] text-center flex flex-row justify-center items-center">
                    <Link href={`/students/${student.id}`}>
                      <FaEdit className="text-2xl px-1 py-1 text-black/50 hover:text-black cursor-pointer" />
                    </Link>
                    <FaTrash
                      onClick={() => removeMutation.mutateAsync(student.id)}
                      className="text-2xl px-1 py-1 bg-white text-black/50 hover:text-red-500 cursor-pointer"
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 flex flex-row bg-white hover:bg-red-300 cursor-pointer px-2 py-4 rounded-sm justify-center items-center"
        >
          Hủy bỏ
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          disabled={isPending}
          className="flex-1 flex flex-row bg-white hover:bg-green-300 cursor-pointer px-2 py-4 rounded-sm justify-center items-center disabled:opacity-50"
        >
          Lưu lại
        </button>
      </div>
    </div>
  );
}

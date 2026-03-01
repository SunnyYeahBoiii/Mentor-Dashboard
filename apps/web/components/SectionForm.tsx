"use client";

import {
  sectionCreateDto,
  sectionEndDto,
  sectionTransferDto,
  sectionUpdateDto,
} from "@/dtos/section.dto";
import { classInfoCreateDto } from "@/dtos/class.dto";
import { formatDateTimeLocal } from "@/utils/funcs";
import {
  createSection,
  createSectionFromRunningSection,
  getClassList,
  updateSectionById,
} from "@/utils/mock-api";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface SectionFormProps {
  section: sectionEndDto;
}

const getClassListOptions = queryOptions({
  queryKey: ["classes", "running-section"],
  queryFn: () => getClassList(),
});

export default function SectionForm({ section }: SectionFormProps) {
  const [name, setName] = useState(section.name);
  const [selectedClass, setSelectedClass] = useState(section.classId);
  const [startTime, setStartTime] = useState<Date>(
    new Date(section.startTime as Date),
  );
  const [endTime, setEndTime] = useState<Date>(
    new Date(section.endTime as Date),
  );
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["section", section.id],
    mutationFn: updateSectionById,
    onSuccess: () => {
      router.push("/current-sessions");
    },
  });

  const { data: classList } = useQuery(getClassListOptions);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSection: sectionUpdateDto = {
      id: section.id,
      name: name,
      classId: selectedClass as string,
      startTime: startTime,
      endTime: endTime,
    };

    console.log(newSection);
    // mutation.mutate(newSection);
  };

  if (!classList) {
    return <div>Error</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-(--dark-white) p-2 py-4 rounded-xl"
    >
      <div className="w-full p-2 border rounded bg-white">
        <p className="text-sm text-gray-500">Tên buổi học</p>
        <input
          type="text"
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full p-2 border rounded bg-white">
        <p className="text-sm text-gray-500">Lớp học</p>
        <Combobox
          required
          items={classList}
          onValueChange={(value: any) => setSelectedClass(value.id)}
          itemToStringLabel={(item) => item.name}
          defaultValue={classList.find(
            (item: classInfoCreateDto) => item.id === section.classId,
          )}
        >
          <ComboboxInput placeholder="Chọn lớp học" />
          <ComboboxContent>
            <ComboboxEmpty>Không tìm thấy lớp học</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.id} value={item}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div className="w-full p-2 border rounded bg-white">
        <p className="text-sm text-gray-500">Thời gian bắt đầu</p>
        <input
          type="datetime-local"
          className="w-full"
          defaultValue={formatDateTimeLocal(startTime)}
          onChange={(e) => setStartTime(new Date(e.target.value))}
        />
      </div>
      <div className="w-full p-2 border rounded bg-white">
        <p className="text-sm text-gray-500">Thời gian kết thúc</p>
        <input
          type="datetime-local"
          className="w-full"
          defaultValue={
            section.endTime
              ? formatDateTimeLocal(endTime)
              : formatDateTimeLocal(new Date())
          }
          onChange={(e) => setEndTime(new Date(e.target.value))}
        />
      </div>

      <div className="flex flex-row justify-end gap-2">
        <button
          type="button"
          className="flex-1 bg-white hover:bg-red-300 rounded-xs py-4 cursor-pointer"
          onClick={() => router.back()}
        >
          Hủy bỏ
        </button>
        <button
          className="flex-1 bg-white hover:bg-green-300 rounded-xs py-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={mutation.isPending}
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
}

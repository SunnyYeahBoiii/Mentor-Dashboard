'use client'

import { runningSectionInfoDto, sectionTransferDto } from "@/dtos/section.dto";
import { formatDateTimeLocal } from "@/utils/funcs";
import { createSectionFromRunningSection } from "@/utils/mock-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { Input } from "@/components/ui/input";

interface RunningSectionFormProps {
    section: runningSectionInfoDto;
}

export default function CurrentSectionForm({ section }: RunningSectionFormProps) {
    const [name, setName] = useState(section.name);
    const [startTime, setStartTime] = useState<Date>(new Date(section.startTime));
    const [endTime, setEndTime] = useState<Date>(new Date());
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['section', section.id],
        mutationFn: createSectionFromRunningSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-sections"] });
            queryClient.invalidateQueries({ queryKey: ["sections"] });
            router.push('/current-sessions');
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSection: sectionTransferDto = {
            runningId: section.id,
            name: name,
            classId: section.classId,
            className: section.className,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
        };
        mutation.mutate(newSection);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-(--dark-white) p-2 py-4 rounded-xl">
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Tên buổi học</label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1.5 opacity-50 cursor-not-allowed">
                <label className="text-sm font-medium">Lớp học</label>
                <Input
                    type="text"
                    value={section.className}
                    disabled
                />
            </div>
            <div className="flex flex-col gap-1.5 opacity-50 cursor-not-allowed">
                <label className="text-sm font-medium">Thời gian bắt đầu</label>
                <Input
                    disabled
                    type="datetime-local"
                    defaultValue={formatDateTimeLocal(startTime)}
                    onChange={(e) => setStartTime(new Date(e.target.value))}
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Thời gian kết thúc</label>
                <Input
                    type="datetime-local"
                    value={formatDateTimeLocal(endTime)}
                    onChange={(e) => setEndTime(new Date(e.target.value))}
                />
            </div>

            <div className="flex flex-col gap-1.5 bg-white rounded-sm p-3">
                <label className="text-sm font-medium">Link buổi học</label>
                <span className="flex flex-row gap-4 items-center">
                    <a className="text-blue-500 hover:text-blue-800 cursor-pointer" href={section.meetingLink} target="_blank" rel="noreferrer">{section.meetingLink}</a>
                    <FaCopy onClick={() => navigator.clipboard.writeText(section.meetingLink)} className="cursor-pointer text-black/50 hover:text-black" />
                </span>
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

'use client'

import { lusitana } from "@/utils/fonts";
import { createRunningSection, getClassList } from "@/utils/mock-api";
import { mutationOptions, queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { useState } from "react";
import { runningSectionCreateDto } from "@/dtos/section.dto";
import { Input } from "@/components/ui/input";

const getClassListOptions = queryOptions({
    queryKey: ["classes", "running-section"],
    queryFn: () => getClassList(),
})

const createSectionOptions = mutationOptions({
    mutationKey: ["section"],
    mutationFn: (sectionInfo: runningSectionCreateDto) => createRunningSection(sectionInfo),
})

export default function AddSessionPage() {
    const classList = useQuery(getClassListOptions)
    const createSectionMutation = useMutation(createSectionOptions)
    const [selectedClass, setSelectedClass] = useState<string | null>(null)
    const [name, setName] = useState<string>("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(selectedClass, name)
        createSectionMutation.mutate({
            name: name,
            classId: selectedClass as string,
        })
    }

    return (
        <div className="w-4/5 m-2 ml-0 flex flex-col">
            <h3 className={`${lusitana.className} absolute text-2xl my-4 mb-6`}>Tạo buổi học mới</h3>

            <div className="flex-1 flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-6">
                    <Input
                        type="text"
                        placeholder="Tên buổi học"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Combobox
                        required
                        items={classList.data}
                        onValueChange={(value: any) => setSelectedClass(value.id)}
                        itemToStringLabel={(item) => item.name}
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

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-(--dark-white) hover:bg-(--gray) text-black py-2 rounded-lg"
                    >
                        Tạo buổi học
                    </button>
                </form>
            </div>
        </div >
    );
}
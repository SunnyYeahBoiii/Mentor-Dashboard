'use client';

import { lusitana } from "@/utils/fonts";
import { useRouter } from "next/navigation";
import { use } from "react";
import { StudentForm } from "@/components/StudentForm";
import { ClassForm } from "@/components/ClassForm";

export default function EditClassPage({ params }: { params: Promise<{ class_id: string }> }) {
    const { class_id } = use(params);
    const router = useRouter();

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Thông tin lớp học</h3>
            <p
                onClick={() => router.back()}
                className="cursor-pointer text-gray-500 hover:text-black mb-4 inline-block"
            >
                {"<"} Trở về
            </p>

            <ClassForm class_id={class_id} />
        </div>
    );
}
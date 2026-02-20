'use client';

import { lusitana } from "@/utils/fonts";
import { useRouter } from "next/navigation";
import { StudentForm } from "@/components/StudentForm";

export default function EditStudentPage() {
    const router = useRouter();

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Thêm học sinh</h3>
            <p
                onClick={() => router.back()}
                className="cursor-pointer text-gray-500 hover:text-black mb-4 inline-block"
            >
                {"<"} Trở về
            </p>

            <StudentForm student_id="None" />
        </div>
    );
}
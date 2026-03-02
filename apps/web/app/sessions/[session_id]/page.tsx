'use client';

import SectionForm from "@/components/SectionForm";
import { lusitana } from "@/utils/fonts";
import { getSectionById } from "@/utils/mock-api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";

const sectionQueryOptions = (session_id: string) => queryOptions({
    queryKey: ['sections', { session_id }],
    queryFn: () => getSectionById(session_id),
})

export default function SessionPage({ params }: { params: Promise<{ session_id: string }> }) {
    const { session_id } = use(params);
    const router = useRouter();

    const { data: section } = useQuery(sectionQueryOptions(session_id));

    if (!section) {
        return (
            <div className="w-4/5 m-2 ml-0">
                <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Thông tin học sinh</h3>
                <p
                    onClick={() => router.back()}
                    className="cursor-pointer text-gray-500 hover:text-black mb-4 inline-block"
                >
                    {"<"} Trở về
                </p>

                <p>Không tìm thấy thông tin buổi học</p>
            </div>
        );
    }

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Thông tin học sinh</h3>
            <p
                onClick={() => router.back()}
                className="cursor-pointer text-gray-500 hover:text-black mb-4 inline-block"
            >
                {"<"} Trở về
            </p>

            <SectionForm section={section} />
        </div>
    );
}
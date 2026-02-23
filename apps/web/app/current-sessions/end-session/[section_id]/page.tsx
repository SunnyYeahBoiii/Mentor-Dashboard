'use client'
import CurrentSectionForm from "@/components/CurrentSectionForm";
import { lusitana } from "@/utils/fonts";
import { use } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getRunningSectionById } from "@/utils/mock-api";

const sectionOptions = (sectionId: string) => queryOptions({
    queryKey: ['section', sectionId],
    queryFn: () => getRunningSectionById(sectionId),
});

export default function EndSessionPage({ params }: { params: Promise<{ section_id: string }> }) {
    const { section_id } = use(params);
    const { data: section, isLoading: isSectionLoading, isError: isSectionError } = useQuery(sectionOptions(section_id));

    if (isSectionLoading) {
        return (
            <div className="w-4/5 m-2 ml-0">
                <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Kết thúc buổi học</h3>
                <p className="animate-pulse">Loading section...</p>
            </div>
        );
    }

    if (isSectionError || !section) {
        return (
            <div className="w-4/5 m-2 ml-0 text-red-500">
                <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Kết thúc buổi học</h3>
                <p>Error loading section. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Kết thúc buổi học</h3>

            <CurrentSectionForm section={{ ...section, startTime: new Date(section.startTime), endTime: new Date() }} />
        </div>
    );
}
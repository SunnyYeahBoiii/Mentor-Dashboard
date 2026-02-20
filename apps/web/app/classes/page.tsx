'use client'

import { classes as ClassesList } from "@/utils/mock-data";
import { classInfoCreateDto } from "@/dtos/class.dto";
import { ClassCard } from "@/components/ClassCard";
import { lusitana } from "@/utils/fonts";

export default function ClassPage() {
    const classes = ClassesList.slice(0, 1);

    return (
        <div className="w-4/5 m-2 ml-0">
            <h3 className={`${lusitana.className} text-2xl my-4 mb-6`}>Danh sách lớp</h3>
            {
                classes.map((classInfo) => (
                    <ClassCard key={classInfo.id} id={classInfo.id} name={classInfo.name} section_count={classInfo.section_count} section_fee={classInfo.section_fee} student_count={classInfo.students_count} />
                ))
            }
        </div >
    );
}
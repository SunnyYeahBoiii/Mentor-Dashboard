'use client'

import { classes as ClassesList } from "@/utils/mock-data";
import { classInfoCreateDto } from "@/dtos/class.dto";
import { ClassCard } from "@/components/ClassCard";

export default function ClassPage() {
    const classes = ClassesList.slice(0, 1);

    return (
        <div className="w-4/5 m-2 ml-0">
            {
                classes.map((classInfo) => (
                    <ClassCard key={classInfo.id} id={classInfo.id} name={classInfo.name} section_count={classInfo.section_count} section_fee={classInfo.section_fee} student_count={classInfo.students_count} />
                ))
            }
        </div >
    );
}
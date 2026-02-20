
interface ClassCardProps {
    id: string;
    name: string;
    section_count: number;
    section_fee: number;
    student_count: number;
}

export function ClassCard({ id, name, section_count, section_fee, student_count }: ClassCardProps) {
    return (
        <div className="w-full bg- flex flex-row justify-between">
            <p className="w-[30%] text-center">{id}</p>
            <p className="w-[30%] text-center">{name}</p>
            <p className="w-[30%] text-center">{section_count}</p>
            <p className="w-[30%] text-center">{section_fee}</p>
            <p className="w-[40%] text-center">{student_count}</p>
        </div>
    );
}
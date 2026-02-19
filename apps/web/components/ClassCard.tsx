
interface ClassCardProps {
    name: string;
    section_count: number;
    section_fee: number;
}

export function ClassCard({ name, section_count, section_fee }: ClassCardProps) {
    return (
        <div className="flex flex-row justify-between">
            <p className="w-[30%] text-center">{name}</p>
            <p className="w-[30%] text-center">{section_count}</p>
            <p className="w-[40%] text-center">{section_fee}</p>
        </div>
    );
}
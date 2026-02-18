import Link from "next/link";

interface buttonProps {
    text: string;
    link: string;
}

export default function Button({ text, link }: buttonProps) {
    return (
        <Link href={link} className="shadow-lg w-[80%] bg-linear-to-r from-(--blue-light) to-(--blue-lighter) text-(--sidebar-font) rounded-xl px-2 py-4 cursor-pointer hover:scale-[1.05] hover:shadow-none active:scale-[0.95] transition-all duration-200">
            <h2 className="text-center">
                {text}
            </h2>
        </Link>
    );
}
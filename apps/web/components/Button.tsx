import Link from "next/link";
import { lusitana } from "@/utils/fonts";
import { ReactNode } from "react";

interface buttonProps {
    text: string;
    link: string;
    icon?: ReactNode;
}

export default function Button({ text, link, icon }: buttonProps) {
    return (
        <Link href={link} className="shadow-lg w-[80%] bg-linear-to-r from-(--blue-light) to-(--blue-lighter) text-(--sidebar-font) rounded-xl px-2 py-4 cursor-pointer hover:scale-[1.05] hover:shadow-none active:scale-[0.95] transition-all duration-200">
            <h2 className={`${lusitana.className} flex flex-row items-center justify-center gap-2 mr-2`}>
                <p>{icon}</p>
                <p>{text}</p>
            </h2>
        </Link>
    );
}
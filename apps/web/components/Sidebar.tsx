"use client";
import "../app/global.css";
import { Button } from "@/components/ui/button";
import { lusitana } from "@/utils/fonts";
import { SlPeople } from "react-icons/sl";
import { SlNote } from "react-icons/sl";
import { SlNotebook } from "react-icons/sl";
import { FaCashRegister, FaGoogle, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";

const navItems: Array<{ icon: IconType; text: string; link: string }> = [
    { icon: SlPeople, text: "Học Sinh", link: "/students?page=1" },
    { icon: SlNote, text: "Lớp Học", link: "/classes?page=1" },
    { icon: SlNotebook, text: "Buổi Học", link: "/sessions" },
    { icon: FaCashRegister, text: "Học Phí", link: "/payments?page=1" },
];

const currentItems: Array<{ icon: IconType; text: string; link: string }> = [
    { icon: SlNote, text: "Buổi học hiện tại", link: "/current-sessions" },
    { icon: FaPlus, text: "Thêm buổi học", link: "/current-sessions/add-session" },
    {
        icon: FaGoogle,
        text: "Đăng nhập Google",
        link: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:21389"}/auth/google`,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (link: string) => {
        const basePath = link.split("?")[0] ?? "";
        return pathname.startsWith(basePath);
    };

    return (
        <div className="sticky flex flex-col w-1/5 bg-(--blue) rounded-tr-xl rounded-br-xl py-6 mr-4">
            <div className="flex-1 flex flex-col w-full justify-center">
                <h1 className={`${lusitana.className} text-center text-2xl text-(--sidebar-font) font-bold`}>Mentor Dashboard</h1>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                        {navItems.map(({ icon: Icon, text, link }) => (
                            <Link href={link} key={text} className="w-[80%]">
                                <Button
                                    variant={isActive(link) ? "default" : "outline"}
                                    className="w-full justify-start gap-2 px-4 py-6 text-base shadow-lg bg-linear-to-r from-(--blue-light) to-(--blue-lighter) text-(--sidebar-font) hover:scale-[1.05] hover:shadow-none active:scale-[0.95] transition-all duration-200"
                                >
                                    <Icon />
                                    {text}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                        {currentItems.map(({ icon: Icon, text, link }) => (
                            <Link href={link} key={text} className="w-[80%]">
                                <Button
                                    variant={isActive(link) ? "default" : "outline"}
                                    className="w-full justify-start gap-2 px-4 py-6 text-base shadow-lg bg-linear-to-r from-(--blue-light) to-(--blue-lighter) text-(--sidebar-font) hover:scale-[1.05] hover:shadow-none active:scale-[0.95] transition-all duration-200"
                                >
                                    <Icon />
                                    {text}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

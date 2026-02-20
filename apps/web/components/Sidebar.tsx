import Link from "next/link";
import "../app/global.css";
import Button from "./Button";
import { lusitana } from "@/utils/fonts";
import { SlPeople } from "react-icons/sl";
import { SlNote } from "react-icons/sl";
import { SlNotebook } from "react-icons/sl";

const icons = [(< SlPeople />), (< SlNote />), (< SlNotebook />)];
const buttonTexts: string[] = ["Học Sinh", "Lớp Học", "Buổi Học"];
const links: string[] = ["/students?page=1", "/classes?page=1", "/sessions"];

export default function Sidebar() {
    return (
        <div className="sticky flex flex-col w-1/5 bg-(--blue) rounded-tr-xl rounded-br-xl py-2 mr-4">
            <div className="flex flex-col w-full justify-center">
                <h1 className={`${lusitana.className} text-center text-2xl text-(--sidebar-font) mt-4 font-bold`}>Mentor Dashboard</h1>
                <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                    {buttonTexts.map((text, index) => (
                        <Button icon={icons[index]} text={text} key={text} link={links[index] as string} />
                    ))}
                </div>
            </div>
        </div >
    );
}

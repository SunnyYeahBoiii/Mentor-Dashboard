import Link from "next/link";
import "../app/global.css";
import Button from "./Button";

const buttonTexts: string[] = ["Danh Sách Học Sinh", "Danh Sách Lớp Học", "Danh Sách Buổi Học"];
const links: string[] = ["/students", "/classes", "/sessions"];

export default function Sidebar() {
    return (
        <div className="flex flex-col w-1/4 h-full bg-(--blue) rounded-xl py-2">
            <div className="flex flex-col w-full justify-center">
                <h1 className="text-center text-(--sidebar-font) text-xl">Sunny's Mentor Dashboard</h1>
                <div className="flex flex-col w-full justify-center items-center gap-5 mt-5">
                    {buttonTexts.map((text, index) => (
                        <Button text={text} key={text} link={links[index] as string} />
                    ))}
                </div>
            </div>
        </div >
    );
}

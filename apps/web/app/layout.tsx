'use client'
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./global.css";
import { inter } from '@/utils/fonts'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(new QueryClient());

    return (
        <html>
            <body className={`${inter.className} overflow-x-hidden min-w-screen min-h-screen`}>
                <div className="min-h-screen rounded-xl flex flex-row bg-(--light-gray)">
                    <Sidebar />
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </div>
            </body>
        </html>
    );
}
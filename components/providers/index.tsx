'use client'

import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "@/components/providers/AuthProvider";

export default function Index({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}
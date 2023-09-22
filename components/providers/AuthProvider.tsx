'use client'


import {usePathname, useRouter} from "next/navigation";
import {ReactNode, useEffect} from "react";
import {useUserStore} from "@/store/UserStore";


export default function AuthProvider({children}: { children: ReactNode }) {
    const isAuth = useUserStore(state => state.isAuth)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(()=>{
        if (isAuth && pathname === '/login') {
            return router.push('/products')
        }
        if (!isAuth && pathname !== '/login') {
            return router.push('/login')
        }
    }, [])

    return children
}
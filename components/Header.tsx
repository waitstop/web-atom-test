'use client';


import Link from "next/link";
import {useUserStore} from "@/store/UserStore";
import {useEffect, useState} from "react";

const Header = () => {
    const isAuth = useUserStore(state => state.isAuth)
    const [isClient, setIsClient] = useState(false)

    useEffect(()=>{
        setIsClient(true)
    }, [])

    return (
        <header className={"flex h-16 flex-row gap-x-4 items-center border-b-2 px-6 md:px-12 lg:px-32 md:gap-x-6"}>
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Products</Link>
            {(isAuth && isClient) &&
                <Link href={"/products/create"}>New product</Link>
            }
        </header>
    );
};

export default Header;
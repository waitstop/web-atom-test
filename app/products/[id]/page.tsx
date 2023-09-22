'use client'

import {useQuery} from "@tanstack/react-query";
import {Product} from "@/components/products/types";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

async function getProductById(id: number) {
    return await axios.get(`https://fakestoreapi.com/products/${id}`).then(res => res.data)
}

export default function Page({params}: { params: { id: number } }) {
    const {isLoading, error, data: product} = useQuery<Product, Error>({
        queryKey: ['product', params.id],
        queryFn: () => getProductById(params.id)
    })

    if(isLoading){
        return (
            <div className={"flex flex-col items-center justify-between gap-x-12 lg:gap-x-32 md:flex-row md:items-start md:justify-center"}>
                <Skeleton className={"h-auto aspect-square w-full md:w-1/2 lg:w-1/3"}/>
                <div className={"flex flex-col mt-6 md:mt-0 gap-y-2 w-full max-w-[500px]"}>
                    <Skeleton className={"h-8"}/>
                    <Skeleton className={"h-6 w-full md:w-16"}/>
                    <hr/>
                    <Skeleton className={"w-full h-64"}/>
                    <Skeleton className={"w-full h-14"}/>
                </div>
            </div>
        )
    }

    if(error){
        return <h1>Error occurred. {error.message}</h1>
    }

    return (
        <div className={"flex flex-col items-center justify-between gap-x-12 lg:gap-x-32 md:flex-row md:items-start md:justify-center"}>
            <img className={"w-full max-w-[500px] md:w-1/2 lg:w-1/3"} src={product.image} alt=""/>
            <div className={"flex flex-col w-full mt-6 md:mt-0 gap-y-2 max-w-[650px]"}>
                <h1 className={"text-xl"}>{product.title}</h1>
                <p className={"text-green-500 font-bold"}>${product.price}</p>
                <hr/>
                <p>{product.description}</p>
                <Button className={"mt-4"}>Purchase</Button>
            </div>
        </div>
    )
}
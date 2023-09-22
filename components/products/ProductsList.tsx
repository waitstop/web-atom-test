'use client'


import ProductItem from "@/components/products/ProductItem";
import {Skeleton} from "@/components/ui/skeleton";
import {useQuery} from "@tanstack/react-query";
import {Product} from "@/components/products/types";
import axios from "axios";

async function getProducts(): Promise<Product[] | []> {
    return await axios.get('https://fakestoreapi.com/products').then(res => res.data)
}

export default function ProductsList() {
    const {isLoading, error, data: products} = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: getProducts
    })


    if (isLoading) {
        return (
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
                {Array.from({length: 6}).map((_, i) => (
                    <div key={`product_skeleton_${i}`}>
                        <Skeleton className={"w-full h-auto aspect-square"}/>
                        <Skeleton className={"w-full h-16 mt-2"}/>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>Error occurred. {error.message}</p>
            </div>
        )
    }

    return (
        <div className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16 md:gap-12"}>
            {products.map((product) =>
                <ProductItem id={product.id}
                             price={product.price}
                             image={product.image}
                             title={product.title}
                             key={`product_${product.id}`}
                />
            )}
        </div>
    )
}
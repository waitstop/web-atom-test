import React from "react";
import {Product} from "@/components/products/types";
import Link from "next/link";


const ProductItem = (props: Omit<Product, "category"|"description">) => {
    return (
        <Link href={`products/${props.id}`} className={"group"}>
            <div className={"bg-contain bg-no-repeat bg-center w-full h-auto aspect-square relative"}
                 style={{backgroundImage: `url(${props.image})`}}>
                <p className={"absolute bottom-2 right-2 bg-neutral-100 p-2 rounded font-bold text-green-500"}>
                    ${props.price}
                </p>
            </div>
            <hr className={"m-2"}/>
            <p className={"truncate block group-hover:underline"}>{props.title}</p>
        </Link>
    );
};

export default ProductItem
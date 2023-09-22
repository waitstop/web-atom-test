import ProductCreateForm from "@/components/products/ProductCreateForm";

export default function Page(){
    return (
        <div className={"max-w-[500px] mx-auto mt-6"}>
            <h1 className={"mb-2 font-bold text-2xl"}>Create new product</h1>
            <hr className={"mb-6"}/>
            <ProductCreateForm/>
        </div>
    )
}
import ProductsList from "@/components/products/ProductsList";



export default async function ProductsPage() {
    return (
        <div>
            <h1 className={"text-2xl mb-4"}>All products: </h1>
            <hr className={"mb-8"}/>
            <ProductsList/>
        </div>
    )
}
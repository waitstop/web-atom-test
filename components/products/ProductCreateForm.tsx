'use client';


import {Input} from "@/components/ui/input";
import {z} from "zod"
import {Button} from "@/components/ui/button";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Product} from "@/components/products/types";
import axios from "axios";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Refresh} from "iconoir-react";

async function getCategories(): Promise<string[]> {
    return await axios.get('https://fakestoreapi.com/products/categories').then(res => res.data)
}

async function createProduct(data: Omit<Product, "image" | "id">) {
    return await axios.post('https://fakestoreapi.com/products', JSON.stringify(data)).then(res => res.data)
}

export default function ProductCreateForm() {
    const {data: categories} = useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => reset()
    })

    const newProductSchema = z.object({
        title: z.string().nonempty("Title is required"),
        price: z.number().min(0.01, "Price must be greater than 0"),
        description: z.string().nonempty("Description is required"),
        category: z.string({
            required_error: "Category is required",
            invalid_type_error: "Category is required"
        }).nonempty("Category is required")
    })

    type newProduct = z.infer<typeof newProductSchema>

    const {control, reset, register, handleSubmit, formState: {errors}} = useForm<newProduct>({
        resolver: zodResolver(newProductSchema)
    })

    async function onSubmit(data: newProduct) {
        await mutation.mutate(data)
    }

    return (
        <form className={"flex flex-col gap-y-4"} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>
                    Title
                    <Input className={errors?.title ? "border-red-500" : ""} type={"text"} {...register('title')}/>
                </label>
                <p className={errors?.title ? "text-red-500 mt-2" : "hidden"}>{errors?.title?.message}</p>
            </div>

            <div>
                <label>
                    Price ($)
                    <Input className={errors?.price ? "border-red-500" : ""}
                           type={"number"} {...register('price', {valueAsNumber: true})}/>
                </label>
                <p className={errors?.price ? "text-red-500 mt-2" : "hidden"}>{errors?.price?.message}</p>
            </div>

            <div>
                <label>
                    Description
                    <Input className={errors?.description ? "border-red-500" : ""}
                           type={"text"} {...register('description')}/>
                </label>
                <p className={errors?.description ? "text-red-500 mt-2" : "hidden"}>{errors?.description?.message}</p>
            </div>

            <div>
                <label>
                    Category
                    <Controller control={control} name={'category'} render={({field}) => (
                        <Select name={field.name} onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder={"Category"}/>
                            </SelectTrigger>
                            <SelectContent ref={field.ref}>
                                {categories?.map(category => (
                                    <SelectItem key={"category_" + category} value={category}>{category}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}/>
                    <p className={errors?.category ? "text-red-500 mt-2" : "hidden"}>{errors?.category?.message}</p>
                </label>
            </div>

            <Button className={"w-full"} type={"submit"}>{mutation.isLoading ? <Refresh className={"animate-spin"}/>:"Create"}</Button>

            <Alert hidden={mutation.isIdle || mutation.isLoading} variant={mutation.isError ? "destructive" : "success"}>
                <AlertTitle>{mutation.isError ? "Error" : "Success"}</AlertTitle>
                <AlertDescription>
                    {mutation.isError ?
                        "An error occurred"
                        :`Product with id ${mutation.data?.id} successfully created`}
                </AlertDescription>
            </Alert>
        </form>
    )
}
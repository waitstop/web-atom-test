'use client'


import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {WarningCircle, Refresh} from "iconoir-react";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/store/UserStore";


export default function LoginForm() {
    const setIsAuth = useUserStore(state=>state.setIsAuth)
    const router = useRouter()

    const UserCreditsSchema = z.object({
        username: z.string().nonempty("Username is required"),
        password: z.string().nonempty("Password is required")
    })

    type UserCredentials = z.infer<typeof UserCreditsSchema>

    const {register, handleSubmit, formState: {errors}} = useForm<UserCredentials>({
        resolver: zodResolver(UserCreditsSchema)
    })

    const mutation = useMutation({
        mutationFn: async (credits: UserCredentials) => {
            const res = await axios.post<{token: string}>('https://fakestoreapi.com/auth/login', credits)
            return res.data
        },
        onSuccess: (data) => {
            setCookie('token', data.token, {
                maxAge: 60 * 60 * 24 * 7,
            })
            setIsAuth(true)
            router.push('/')
        }
    })

    async function onSubmit(data: UserCredentials) {
        await mutation.mutate({...data})
    }

    return (
        <div className={"w-full max-w-[500px]"}>
            <h1 className={"mb-2"}>Sign-in to your account</h1>
            <hr className={"mb-6"}/>
            <form className={"flex flex-col gap-y-2 w-full"} onSubmit={handleSubmit(onSubmit)}>
                <Input className={`${errors.username ? "border-red-500" : ""}`} placeholder={"Username"}
                       type={"text"} autoComplete={"username"} {...register('username')}/>
                <p className={"text-red-500"}>{errors.username?.message}</p>

                <Input className={`${errors.password ? "border-red-500" : ""}`} placeholder={"Password"}
                       type={"password"} autoComplete={"current-password"} {...register('password')}/>
                <p className={"text-red-500"}>{errors.password?.message}</p>
                <Button disabled={!!errors.username || !!errors.password || mutation.isLoading} type={"submit"}>{mutation.isLoading ? <Refresh className={"animate-spin"}/> : "Sign in"}</Button>
            </form>
            <Alert variant="destructive" className={`mt-6 ${mutation.error ? "block" : "hidden"}`}>
                <WarningCircle className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Incorrect username or password. Please log in again.
                </AlertDescription>
            </Alert>
        </div>
    )
}
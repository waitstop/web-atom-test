import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage(){
    return (
        <div className={"min-h-[calc(100vh-4rem)] w-full flex justify-center items-center"}>
            <LoginForm/>
        </div>
    )
}
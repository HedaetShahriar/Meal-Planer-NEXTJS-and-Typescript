import { SignInSchema } from "../_types/signInSchema";
import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "./sign-in-mutations";
import { useRouter } from "next/navigation";


const useSignIn = () => {
    return useMutation({
        mutationFn: async (data: SignInSchema) =>{
            await signIn(data);
        }
    })
}
const useSignOut =() => {
    const router = useRouter();
    return useMutation({
        mutationFn: signOut,
        onSuccess: () =>{
            router.replace("/sign-in")
        }
    })
}
export { useSignIn, useSignOut };
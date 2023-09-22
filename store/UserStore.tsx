import {create} from "zustand";
import {hasCookie} from "cookies-next";

export const useUserStore = create<{ isAuth: boolean, setIsAuth: (isAuth: boolean) => void }>()((set)=> ({
    isAuth: hasCookie('token'),
    setIsAuth: (isAuth: boolean) => {
        set({isAuth: isAuth})
    }
}))
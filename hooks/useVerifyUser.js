import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useVerifyUser() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

const verifyUser = async () => {
        const response = await fetch(`${apiUrl}user-data`, {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        if (response.status !== 200) {
            router.push("/");
        }
    }

    useEffect(() => {
        verifyUser();
    }, []);
}
export default async function useLogout() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}logout`, {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();
    if (response.status === 200) {
        window.location.href = "/";
    }
}
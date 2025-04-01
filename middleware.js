import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = req.cookies.get('token');
    const {pathname} = req.nextUrl;
    const pages = ['/login', '/register'];

    if (!token && !pages.includes(pathname)) {   
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    if (token && pages.includes(pathname)){
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/login', '/register'],
};
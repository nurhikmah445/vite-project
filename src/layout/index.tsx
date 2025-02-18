import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import apifetch from "../utils/axios";

export default function Layout() {
    const nav = useNavigate();
    const path = useLocation();
    const [loading, setLoading] = useState(false);

    async function auth() {
        sessionStorage.removeItem("user");
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            if (token == null) throw new Error("Invalid Token");

            const fetching = await apifetch("/auth", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (fetching.status >= 400) throw new Error("UnAuthorized");

            const user = fetching.data;

            sessionStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            if (!["/login", "/register"].includes(path.pathname)) {
                nav("/login");
            }
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        auth();
    }, []);

    if (loading) return <>Loading...</>;

    return (
        <>
            <Outlet />
        </>
    );
}
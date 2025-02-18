import { useEffect, useState } from "react";

export default function useUser() {
    const [user, setUser] = useState<{
        id : number,
        username : string,
        role : string
    } | null>(null)

    useEffect(() => {
        const user = sessionStorage.getItem("user")
        if(user == null) {
            setUser(null)
            return
        }
        setUser(JSON.parse(user))
    }, [])

    return user

}
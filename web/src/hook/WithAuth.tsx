'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const WithAuth = (Component: any) => {
    return function ProtectedRoutes({ ...props }) {
        const router = useRouter();
        let user: any | null;
        const userJSON = localStorage.getItem("session")
        if (userJSON) {
            user = JSON.parse(userJSON)
        } else {
            user = null;
        }
        const userIsAuthenticated = user !== null;

        useEffect(() => {
            if (!userIsAuthenticated) {
                router.push("/sign-in")
            }
        })
        return <Component {...props} />
    }
}

export default WithAuth
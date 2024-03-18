import axios from "axios"

export async function refresh() {
    const session = JSON.parse(localStorage.getItem("session") || "{}")

    if (!session || !session.refreshToken) {
        throw {
            message: "Session not found, please login.",
        }
    }

    // call api
    const header = {
        Authorization: `Bearer ${session.refreshToken}`,
    }
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
        headers: header,
    })

    const newSession = data.data

    // luu lai vao trong localstorage

    localStorage.setItem("session", JSON.stringify(newSession))
}

"use client"

const getCookie = (cookieName: string) => {
    const cookies = document.cookie
    const cookieValue = cookies
        .split("; ")
        .find(row => row.startsWith(cookieName + '='))
    return cookieValue ? cookieValue.split('=')[1] : null
}

export default getCookie
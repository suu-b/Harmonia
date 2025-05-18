interface cookieQuery {
    cookieName: string,
    cookieVal: string,
    expiryDays: number
}

function setCookie({ cookieName, cookieVal, expiryDays }: cookieQuery) {
    let expires = ""
    if (expiryDays) {
        let date = new Date()
        date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000))
        expires = '; expires = ' + date.toUTCString()
    }
    cookieVal = encodeURIComponent(cookieVal)
    document.cookie = cookieName + "=" + cookieVal + expires + ";path=/"
}

export default setCookie
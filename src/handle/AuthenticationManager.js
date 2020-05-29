import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = () => {
    let token = cookies.get("token")

    if (token == null || token === "")
        return null

    return token
}

export const logout = () => cookies.remove("token")

export const signedIn = () => {
    return getToken() != null
}

export const getOtherUserData = (name, callback) => {
    fetch(`http://localhost:8080/user/name/${name}`, {
        method: 'GET',
        headers: {
            "Authorization": "bearer " + getToken()
        }
    })
        .then((content) => {
            if (content.ok) {
                content.text()
                    .then((str) => {
                        let data =  JSON.parse(str).payload

                        callback(true, data)
                    })
            } else
                callback(false, null)
        })
        .catch(() => {
            callback(false, null)
        })
}

export const getUserData = (callback) => {
    // let userData = cookies.get("data")
    //
    // if (userData != null && userData !== "")
    //     return userData

    fetch('http://localhost:8080/user', {
        method: 'GET',
        headers: {
            "Authorization": "bearer " + getToken()
        }
    })
        .then((content) => {
            if (content.ok) {
                content.text()
                    .then((str) => {
                        let data =  JSON.parse(str).payload
                        //
                        // cookies.set("data", data, {
                        //     path: '/',
                        //     sameSite: 'Strict'
                        // })

                        callback(true, data)
                    })
            } else
                callback(false, null)
        })
        .catch(() => {
            callback(false, null)
        })
}

/**
 *
 * @param username
 * @param pass
 * @param callback
 */
export const login = (username, pass, callback) => {
    console.log("Attempting to sign in...")

    let formData = new FormData()

    formData.append("username", username)
    formData.append("password", pass)

    fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        body: formData
    }).then((content) => {
        if (content.ok) {
            content.text()
                .then((str) => {
                    let token =  JSON.parse(str).payload.token

                    cookies.set("token", token, {
                        path: '/',
                        sameSite: 'Strict'
                    })

                    callback(true, token)
                })
        } else
            callback(false, null)
    })
        .catch(() => {
            callback(false, null)
        })
}


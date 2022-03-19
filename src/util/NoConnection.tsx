import React from "react"
import ErrorPage from "./ErrorPage"

const NoConnection = () => (
    <ErrorPage
        content={
            <p>
                A connection could not be made to the backend.
                <br /> Please check your internet connection or the{" "}
                <a href="https://status.unifey.app">status of our backend</a>.
            </p>
        }
        code={1006}
    />
)

export default NoConnection

import React, { useEffect } from "react"
import { AppProps } from "next/app"

import "../styles/globals.scss"

import Background from "../components/Background"

const App = function ({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        document.documentElement.classList.add("bg-base-300")
    }, [])

    return (
        <div>
            <Background />

            <Component {...pageProps} />
        </div>
    )
}

export default App

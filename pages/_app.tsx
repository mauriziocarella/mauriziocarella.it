import React, { useEffect } from "react"
import { AppProps } from "next/app"

import "../styles/globals.scss"

import Background from "../components/Background"
import {Cookie} from "../components/Cookie";

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        document.documentElement.classList.add("bg-base-300")
    }, [])

    return (
        <div>
            <Background />

            <Component {...pageProps} />

            <Cookie />
        </div>
    )
}

export default App

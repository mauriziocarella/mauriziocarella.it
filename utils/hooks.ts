import { useEffect, useState } from "react"

export const useDarkMode = (): [boolean, () => void] => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        setDarkMode(
            window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
        )

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (e) => setDarkMode(e.matches))
    }, [])

    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        )
    }, [darkMode])

    return [darkMode, toggleTheme]
}

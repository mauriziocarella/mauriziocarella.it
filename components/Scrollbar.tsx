import React from "react"
import PerfectScrollbar, { ScrollBarProps } from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

const Scrollbar: React.FC<ScrollBarProps> = ({ ...props }) => {
    return <PerfectScrollbar {...props} />
}

export default Scrollbar

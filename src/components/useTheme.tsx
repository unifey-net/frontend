import { useSelector } from "react-redux"
import { isAutoDark } from "../api/util/Util"

const DARK = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.1/antd.dark.css"
const LIGHT = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.1/antd.min.js"

const useTheme = (): [string, string] => {
    const theme = useSelector((state: any) => state.theme)

    let clazz = ""
    let file = ""

    switch (theme.theme) {
        case "light": {
            clazz = "page-container-light"
            file = LIGHT
            break
        }

        case "dark": {
            clazz = "page-container-dark"
            file = DARK
            break
        }

        case "auto": {
            if (isAutoDark()) {
                clazz = "page-container-dark"
                file = DARK
            } else {
                clazz = "page-container-light"
                file = LIGHT
            }

            break
        }

        default:
            break
    }

    return [clazz, file]
}

export default useTheme
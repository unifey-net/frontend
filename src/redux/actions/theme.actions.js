export const THEME_LIGHT = "THEME_LIGHT"
export const THEME_DARK = "THEME_DARK"
export const THEME_AUTO = "THEME_AUTO"

export const themeDark = stay => ({
    type: THEME_DARK,
    payload: {
        stay,
    },
})

export const themeLight = stay => ({
    type: THEME_LIGHT,
    payload: {
        stay,
    },
})

export const themeAuto = stay => ({
    type: THEME_AUTO,
    payload: {
        stay,
    },
})

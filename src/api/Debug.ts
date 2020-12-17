let debug = (debug: string, extra?: any[]) => {
    console.log(
        `%c[%c Unifey %c] %c${debug}`,
        "color: brown;",
        "color: green;",
        "color: brown;",
        "",
        ...(extra === undefined ? [] : extra)
    )
}

export default debug

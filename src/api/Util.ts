/**
 * Returns if it should be dark mode.
 */
export const isAutoDark = () => {
    let time = new Date().getHours()

    return time >= 18 || 8 >= time
}

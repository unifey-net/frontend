export const media = (
    phone: string,
    tablet: string,
    desktop: string
): string => {
    return `
        ${desktop !== `` && desktopMedia(desktop)}
        ${tablet !== `` && tabletMedia(tablet)}
        ${phone !== `` && phoneMedia(phone)}
    `
}

export const phoneMedia = (phone: string) => {
    return `
        @media (max-width: 768px) {
            ${phone}
        }
    `
}

export const tabletMedia = (tablet: string) => {
    return `
        @media (min-width: 768px) and (max-width: 1024px) {
            ${tablet}
        }
    `
}

export const desktopMedia = (desktop: string) => {
    return `
        @media (min-width: 1024px) {
            ${desktop}
        }
    `
}

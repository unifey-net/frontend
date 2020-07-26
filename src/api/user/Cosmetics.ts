type Cosmetic = {
    type: number,
    desc: string,
    id: string,
    image: string
}

/**
 * Get the badges from a cosmetics list.
 * @param {*} cosmetics 
 */
export const getBadges = (cosmetics: Cosmetic[]): Cosmetic[] => {
    let badges = []
    
    for (let i = 0; cosmetics.length > i; i++) {
        let cosmetic = cosmetics[i];

        if (cosmetic.type === 0)
            badges.push(cosmetic)
    }

    return badges
}
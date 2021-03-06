import React from "react"
import { Tooltip } from "antd"

const UserBadges: React.FC<{ badges: any }> = ({ badges }) => {
    if (badges.length === 0) return <></>

    return (
        <div className="flex flex-row">
            <br />
            {badges.map((badge: any, index: number) => (
                <Tooltip key={index} title={badge.desc}>
                    <img
                        key={index}
                        alt={badge.id}
                        src={badge.image}
                        height={32}
                        width={32}
                    />
                </Tooltip>
            ))}
        </div>
    )
}

export default UserBadges
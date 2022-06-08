import React from "react"
import { Tooltip } from "antd"
import { BASE_URL } from "../../api/ApiHandler"
import styled from "styled-components"

const Badges = styled.div`
    display: flex;
    flex-direction: row;
`

const UserBadges: React.FC<{ badges: any }> = ({ badges }) => {
    if (badges.length === 0) return <></>

    return (
        <Badges>
            {badges.map((badge: any, index: number) => (
                <Tooltip key={index} title={badge.desc}>
                    <img
                        key={index}
                        alt={badge.id}
                        src={
                            BASE_URL +
                            `/user/cosmetic/viewer?type=${badge.type}&id=${badge.id}`
                        }
                        width={32}
                    />
                </Tooltip>
            ))}
        </Badges>
    )
}

export default UserBadges

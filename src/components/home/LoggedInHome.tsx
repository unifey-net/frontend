import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { getCommunityById } from "../../api/community/Community"
import { media } from "../../api/util/Media"
import Community from "../community/communities/Community"
import CustomFeed from "../feed/controller/CustomFeedController"
import Notifications from "../user/Notifications"

const LoggedInHomeStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .shelf {
        display: flex;
        ${media(
            `
                align-items: center;
                flex-direction: column-reverse;
                

                .side-community-bar {
                    text-align: center;
                }
            `,
            "flex-direction: row;",
            "flex-direction: row;"
        )}
        gap: 16px;

        .side-community-bar {
            background-color: ${({ theme }) => theme.primary};
            border-radius: 32px;
            padding: 16px;
        }
    }
`

const LoggedInHome: React.FC = () => {
    const [communities, setCommunities] = useState([] as any[])
    let self = useSelector((store: any) => store.auth)

    let name = self.user.username

    // load the user's communities.
    useEffect(() => {
        const loadCommunities = async () => {
            const members = self.user.member.members

            for (let i = 0; members.length > i; i++) {
                const member = members[i]
                const community = await getCommunityById(member)

                setCommunities(prev => [...prev, community.data.community])
            }
        }

        loadCommunities()
    }, [self])

    return (
        <LoggedInHomeStyle>
            <h1>Welcome back, {name}.</h1>
            <Notifications />

            <div className="shelf">
                <CustomFeed url={"/feeds/self"} />
                <div className="">
                    <div className="side-community-bar">
                        {communities.map(community => (
                            <Community community={community} />
                        ))}
                    </div>
                </div>
            </div>
        </LoggedInHomeStyle>
    )
}

export default LoggedInHome

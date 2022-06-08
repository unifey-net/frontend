import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { getCommunityById } from "../../api/community/Community"
import { useLiveSocket } from "../../api/live/Live"
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
                    min-width: 300px;
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

            div {
                background-color: ${({ theme }) => theme.secondary};
            }
        }
    }
`

const LoggedInHome: React.FC = () => {
    const [sendAction] = useLiveSocket()

    const [communities, setCommunities] = useState([] as any[])
    let members = useSelector((store: any) => store.auth.member.members)
    let name = useSelector((store: any) => store.auth.user.username)

    // load the user's communities.
    useEffect(() => {
        const loadCommunities = async () => {
            if (members) {
                for (let i = 0; members.length > i; i++) {
                    const member = members[i]
                    const community = await getCommunityById(member)

                    setCommunities(prev => [...prev, community.data.community])
                }
            }
        }

        loadCommunities()
        //eslint-disable-next-line
    }, [members])

    return (
        <LoggedInHomeStyle>
            <h1>Welcome back, {name}.</h1>
            <Notifications />

            <div className="shelf">
                <CustomFeed url={"/feeds/self"} />

                {communities.length !== 0 && (
                    <div>
                        <div className="side-community-bar">
                            {communities.map((community, index) => (
                                <Community
                                    community={community}
                                    key={index}
                                    useNotifications={true}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </LoggedInHomeStyle>
    )
}

export default LoggedInHome

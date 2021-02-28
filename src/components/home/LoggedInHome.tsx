import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getCommunityById } from "../../api/community/Community"
import Community from "../community/communities/Community"

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
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl">Welcome back, {name}.</h1>
            <p>You have no new notifications.</p>

            <div>
                <p>
                    This is where a personalized feed would go, if that actually
                    existed.
                </p>
                <div className="flex flex-col">
                    {communities.map(community => <Community community={community} />)}
                </div>
            </div>
        </div>
    )
}

export default LoggedInHome

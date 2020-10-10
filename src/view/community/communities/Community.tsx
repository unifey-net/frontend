import React from "react"
import CommunityManage from "../../../components/feed/CommunityManage"
import { Link } from "react-router-dom"

type Props = {
    community: any
    index: number
}

export default ({ community, index }: Props) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg gap-2 accent">
            <div className="p-6 flex-col flex">
                <div className="flex flex-row justify-between">
                    <h1 className="text-xl">
                        <Link to={`/c/${community.name}`}>
                            {community.name}
                        </Link>
                    </h1>

                    <CommunityManage community={community.id} />
                </div>

                <p
                    dangerouslySetInnerHTML={{
                        __html: community.description,
                    }}
                />

                <div className="flex flex-row justify-between">
                    <span className="text-gray-600 text-sm">#{index + 1}</span>
                    <span className="text-gray-600 text-sm">
                        {community.size} Members
                    </span>
                </div>
            </div>
        </div>
    )
}

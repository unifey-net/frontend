import React from "react"
import { CommunityRequest } from "../../../../../api/community/CommunityUtil"
import { Radio, Tooltip, message } from "antd"
import CommunityPermission from "./CommunityPermission"
import ChangeCommunityName from "./inputs/ChangeCommunityName"
import ChangeCommunityDesc from "./inputs/ChangeCommunityDesc"
import { API } from "../../../../../api/ApiHandler"
import { Redirect } from "react-router-dom"
import NotFound from "../../../../NotFound"

type Props = {
    community: CommunityRequest
}

export default ({ community }: Props) => {
    return (
        <>
            <h1 className="text-2xl">General Settings</h1>

            <div className="mb-4">
                <h2 className="text-lg">Community Permissions</h2>
                <div className="flex flex-col gap-8">
                    <CommunityPermission
                        initialValue={1}
                        community={community}
                        title="Post Level"
                        desc="This is what level a user must be to be able to create a
                        post."
                        action="create posts."
                        save={async value => {
                            let form = new FormData()

                            form.append("role", `${value}`)

                            let request = await API.put(
                                `/community/${community.community.id}/roles/post`,
                                form
                            )

                            if (request.status !== 200) {
                                message.error(request.data.payload)
                            }
                        }}
                    />

                    <CommunityPermission
                        initialValue={1}
                        community={community}
                        title="View Level"
                        desc="This is what level a user must be to be able to view
                        posts."
                        action="view posts."
                        save={async value => {
                            let form = new FormData()

                            form.append("role", `${value}`)

                            let request = await API.put(
                                `/community/${community.community.id}/roles/view`,
                                form
                            )

                            if (request.status !== 200) {
                                message.error(request.data.payload)
                            }
                        }}
                    />

                    <CommunityPermission
                        initialValue={1}
                        community={community}
                        title="Comment Level"
                        desc="This is what level a user must be to be able to comment
                        on posts."
                        action="comment on posts."
                        save={async value => {
                            let form = new FormData()

                            form.append("role", `${value}`)

                            let request = await API.put(
                                `/community/${community.community.id}/roles/comment`,
                                form
                            )

                            if (request.status !== 200) {
                                message.error(request.data.payload)
                            }
                        }}
                    />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg">Other</h2>
                <div className="flex flex-col gap-8">
                    <ChangeCommunityName community={community} />
                    <ChangeCommunityDesc community={community} />
                </div>
            </div>
        </>
    )
}

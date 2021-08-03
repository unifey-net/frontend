import React from "react"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import CommunityPermission from "./CommunityPermission"
import ChangeCommunityName from "./inputs/ChangeCommunityName"
import ChangeCommunityDesc from "./inputs/ChangeCommunityDesc"
import { updateCommunityPermissionRole } from "../../../../api/community/Community"
import toast from "react-hot-toast"

type Props = {
    community: CommunityRequest
}

/**
 * General settings for moderating community.
 */
const GeneralSettings: React.FC<Props> = ({ community }) => {
    /**
     * Update a communities permission.
     * 
     * @param role The role number.
     * @param type The type. (post/comment/view)
     */
    const updatePermission = async (role: number, type: string) => {
        const request = await updateCommunityPermissionRole(
            community.community.id,
            role,
            type
        )

        if (request.status !== 200) {
            toast.error(
                "There was an issue updating the permissions."
            )
        }
    }

    return (
        <>
            <h1 className="text-2xl">General Settings</h1>

            <div className="mb-4">
                <h2 className="text-lg">Community Permissions</h2>
                <div className="flex flex-col gap-8">
                    <CommunityPermission
                        initialValue={1}
                        title="Post Level"
                        desc="This is what level a user must be to be able to create a
                        post."
                        action="create posts."
                        save={async value =>
                            await updatePermission(value, "post")
                        }
                    />

                    <CommunityPermission
                        initialValue={1}
                        title="View Level"
                        desc="This is what level a user must be to be able to view
                        posts."
                        action="view posts."
                        save={async value =>
                            await updatePermission(value, "view")
                        }
                    />

                    <CommunityPermission
                        initialValue={1}
                        title="Comment Level"
                        desc="This is what level a user must be to be able to comment
                        on posts."
                        action="comment on posts."
                        save={async value =>
                            await updatePermission(value, "comment")
                        }
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

export default GeneralSettings;
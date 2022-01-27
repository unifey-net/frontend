import React from "react"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import CommunityPermission from "./CommunityPermission"
import ChangeCommunityName from "./inputs/ChangeCommunityName"
import ChangeCommunityDesc from "./inputs/ChangeCommunityDesc"
import { updateCommunityPermissionRole } from "../../../../api/community/Community"
import toast from "react-hot-toast"
import ModeratePage from "../ModeratePage"

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
        <ModeratePage>
            <div className="settings-cluster">
                <h3 className="cluster-title">Community Permissions</h3>

                <div className="cluster-items">
                    <CommunityPermission
                        initialValue={community.community.permissions.postRole}
                        title="Post Level"
                        desc="This is what level a user must be to be able to create a
                        post."
                        action="create posts."
                        save={async value =>
                            await updatePermission(value, "post")
                        }
                    />

                    <CommunityPermission
                        initialValue={community.community.permissions.viewRole}
                        title="View Level"
                        desc="This is what level a user must be to be able to view
                        posts."
                        action="view posts."
                        save={async value =>
                            await updatePermission(value, "view")
                        }
                    />

                    <CommunityPermission
                        initialValue={community.community.permissions.commentRole}
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

            <div className="settings-cluster">
                <h3 className="cluster-title">Other</h3>

                <div className="cluster-items">
                    <ChangeCommunityName community={community} />
                    <ChangeCommunityDesc community={community} />
                </div>
            </div>
        </ModeratePage>
    )
}

export default GeneralSettings;

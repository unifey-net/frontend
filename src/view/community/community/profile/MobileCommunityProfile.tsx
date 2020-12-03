import React from "react"
import CommunityManage from "../../../../components/feed/CommunityManage"
import Text from "antd/lib/typography/Text"
import { Divider } from "antd"
import { EditOutlined, EditFilled } from "@ant-design/icons"
import useEditCommunity from "../useEditCommunity"
import { useDispatch } from "react-redux"
import {
    stopEditing,
    startEditing,
} from "../../../../redux/actions/editor.actions"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"

type Props = {
    community: CommunityRequest
}

export default ({ community }: Props) => {
    const dispatch = useDispatch()
    const editing = useEditCommunity(community.community.id)

    const toggleEdit = () => {
        if (editing) {
            dispatch(stopEditing())
        } else {
            dispatch(startEditing(community.community.id, "community"))
        }
    }

    return (
        <div
            className="accent p-4 rounded mt-16 invisible lg:visible"
            style={{
                maxWidth: "200px",
                height: "min-content",
            }}
        >
            <div className="flex flex-row justify-between">
                <h3 className="text-lg">
                    {community.community.name}{" "}
                    {community.selfRole === 4 && (
                        <span
                            className="text-gray-600 cursor-pointer -mt-4"
                            onClick={toggleEdit}
                        >
                            {editing ? <EditFilled /> : <EditOutlined />}
                        </span>
                    )}
                </h3>

                <CommunityManage community={community.community.id} style="BUTTON" />
            </div>

            <Text>
                <p
                    dangerouslySetInnerHTML={{
                        __html: community.community.description,
                    }}
                />
            </Text>

            <Divider />

            <h3 className="text-lg">Member Count</h3>
            <Text>{community.community.size} members.</Text>

            <Divider />

            <h3 className="text-lg">Created On</h3>
            <Text>
                {new Date(community.community.createdAt).toLocaleString()}
            </Text>
        </div>
    )
}

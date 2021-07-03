import React from "react"
import CommunityManage from "../../feed/CommunityManage"
import Text from "antd/lib/typography/Text"
import { Divider } from "antd"
import { EditOutlined, EditFilled } from "@ant-design/icons"
import useEditCommunity from "../../../api/community/useEditCommunity"
import { useDispatch } from "react-redux"
import {
    stopEditing,
    startEditing,
} from "../../../redux/actions/editor.actions"
import { CommunityRequest } from "../../../api/community/CommunityUtil"
import JoinCommunity from "./JoinCommunity"
import styled, { ThemeContext } from "styled-components"

const MobileCommunityProfileStyle = styled.div`
    background-color: #191919;
    width: 100%;

    margin-left: 16px;
    margin-right: 16px;
    padding: 16px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    .pair {
        h4 {
            font-size: 12px;
            font-weight: normal;
            color: #696761;
        }

        p {
            color: white;
        }
    }
`

/**
 * A community profile for mobile.
 */
const MobileCommunityProfile: React.FC<{ community: CommunityRequest }> = ({ community }) => {
    const dispatch = useDispatch()
    const editing = useEditCommunity(community.community.id)

    return (
        <MobileCommunityProfileStyle>
            <div>
                <div className="pair">
                    <h4>Description</h4>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: community.community.description,
                        }}
                    />
                </div>

                <div className="pair">
                    <h4>Member Count</h4>
                    <p>{community.community.size} members.</p>
                </div>

                <div className="pair">
                    <h4>Created On</h4>
                    <p>
                        {new Date(
                            community.community.createdAt
                        ).toLocaleString()}
                    </p>
                </div>
            </div>
        </MobileCommunityProfileStyle>
    )
}

export default MobileCommunityProfile;
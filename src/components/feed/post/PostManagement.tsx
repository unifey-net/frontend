import React, { useState, useEffect } from "react"
import { getSelf, signedIn, User } from "../../../api/user/User"
import { Menu, Modal, Dropdown } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    CaretDownFilled,
    FlagOutlined,
} from "@ant-design/icons"
import {
    Post,
    deletePost,
    useEditingStatus,
    deleteComment,
} from "../../../api/Feeds"
import CommentObject from "../../../api/Comment"
import { useDispatch, useSelector } from "react-redux"
import usePostReport from "./usePostReport"
import toast from "react-hot-toast"
import { useCommunity } from "../../../api/community/CommunityUtil"
import { getNameById } from "../../../api/community/redux/community.redux"
import { RootState } from "../../../redux/store"
import { startEditing, stopEditing } from "../../../redux/editor.redux"

const { confirm } = Modal

type Props = {
    type: string
    object: Post | CommentObject
}

const PostManagement: React.FC<Props> = ({ object, type }) => {
    const self = useSelector((state: RootState) => state.auth.user) as User
    const post = useSelector((state: RootState) => state.post)

    const storedCommunity = useSelector(
        (state: any) =>
            state.community[
                getNameById(state.community, +object.feed.substring(3))
            ]
    )

    const editing = useEditingStatus(object.id)
    const dispatch = useDispatch()

    const isModerator =
        storedCommunity !== undefined && storedCommunity.selfRole >= 2
    const isOwner = self.id === object.authorId

    const toggleEditing = () => {
        if (editing) {
            dispatch(stopEditing())
        } else {
            dispatch(
                startEditing({
                    id: object.id,
                    type: type === "comment" ? "comment" : "post",
                })
            )
        }
    }

    const confirmDelete = () => {
        confirm({
            title: `Are you sure you want to delete this ${
                type === "comment" ? "comment" : "post"
            }?`,
            icon: <ExclamationCircleOutlined />,
            content: `You will not be able to get this ${
                type === "comment" ? "comment" : "post"
            } back if you delete it.`,
            onOk() {
                if (type === "comment") {
                    let comment = object as CommentObject

                    deleteComment(comment.feed, post, comment.id)
                } else {
                    deletePost(object.feed, object.id)
                }

                window.location.reload()
            },
            onCancel() {},
        })
    }

    const [toggle, modal] = usePostReport(object)

    const openMenu = () => {
        if (signedIn()) {
            toggle()
        } else {
            toast.error("You must be signed in for this!")
        }
    }

    const menu = (
        <Menu>
            <Menu.Item key={1} onClick={openMenu}>
                Report <FlagOutlined /> {modal}
            </Menu.Item>

            {(isModerator || isOwner) && (
                <Menu.Item key={2} onClick={confirmDelete}>
                    Delete <DeleteOutlined />
                </Menu.Item>
            )}

            {isOwner && (
                <Menu.Item key={3} onClick={toggleEditing}>
                    Edit <EditOutlined />
                </Menu.Item>
            )}
        </Menu>
    )

    return (
        <Dropdown overlay={menu}>
            <CaretDownFilled className="hover:text-blue-600 cursor-pointer" />
        </Dropdown>
    )
}

export default PostManagement

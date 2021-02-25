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
import {
    startEditing,
    stopEditing,
} from "../../../redux/actions/editor.actions"
import usePostReport from "./usePostReport"
import toast from "react-hot-toast"
import ToastTheme from "../../../api/ToastTheme"

const { confirm } = Modal

type Props = {
    type: string
    object: Post | CommentObject
}

export default ({ object, type }: Props): JSX.Element => {
    const [self, setSelf] = useState({} as User)
    const post = useSelector((state: any) => state.post)

    const editing = useEditingStatus(object.id)
    const dispatch = useDispatch()

    useEffect(() => {
        const loadSelf = async () => {
            setSelf(await getSelf())
        }

        loadSelf()
    }, [])

    const toggleEditing = () => {
        if (editing) {
            dispatch(stopEditing())
        } else {
            dispatch(
                startEditing(object.id, type === "comment" ? "comment" : "post")
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
            toast.error("You must be signed in for this!", ToastTheme)
        }
    }

    const elevatedMenu = (
        <Menu>
            <Menu.Item key={1} onClick={toggleEditing}>
                Edit <EditOutlined />
            </Menu.Item>

            <Menu.Item key={2} onClick={confirmDelete}>
                Delete <DeleteOutlined />
            </Menu.Item>

            <Menu.Item key={3} onClick={openMenu}>
                Report <FlagOutlined /> {modal}
            </Menu.Item>
        </Menu>
    )

    const regularMenu = (
        <Menu>
            <Menu.Item key={1} onClick={openMenu}>
                Report <FlagOutlined /> {modal}
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown
            overlay={self.id === object.authorId ? elevatedMenu : regularMenu}
        >
            <CaretDownFilled className="hover:text-blue-600 cursor-pointer" />
        </Dropdown>
    )
}

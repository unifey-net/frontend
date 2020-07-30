import React, { useState, useEffect } from "react"
import { getSelf, User } from "../../../api/user/User"
import { Menu, Modal, Dropdown } from "antd"
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, CaretDownFilled } from "@ant-design/icons"
import PostReport from "./PostReport"
import { Post, Comment as CommentObject, deletePost, useEditingStatus, deleteComment } from "../../../api/Feeds"
import { useDispatch, useStore, useSelector } from "react-redux"
import { startEditing, stopEditing } from "../../../redux/actions/editor.actions"

const { confirm } = Modal

type Props = {
    type: string,
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
            dispatch(startEditing(object))
        }
    }

    const confirmDelete = () => {
        confirm({
            title: `Are you sure you want to delete this ${type === "comment" ? "comment" : "post"}?`,
            icon: <ExclamationCircleOutlined />,
            content:
                `You will not be able to get this ${type === "comment" ? "comment" : "post"} back if you delete it.`,
            onOk() {
                if (type === "comment") {
                    let comment = object as CommentObject

                    deleteComment(comment.feed, post, comment.id);
                } else {
                    deletePost(object.feed, object.id);
                }
            },
            onCancel() { },
        });
    };

    const elevatedMenu = (
        <Menu>
            <Menu.Item key={1} onClick={toggleEditing}>
                <span>
                    Edit <EditOutlined />
                </span>
            </Menu.Item>

            <Menu.Item key={2}>
                <span onClick={confirmDelete}>
                    Delete <DeleteOutlined />
                </span>
            </Menu.Item>

            <Menu.Item key={3}>
                <PostReport post={object} />
            </Menu.Item>
        </Menu>
    );

    const regularMenu = (
        <Menu>
            <Menu.Item key={1}>
                <PostReport post={object} />
            </Menu.Item>
        </Menu>
    );
    
    return (
        <Dropdown overlay={self.id === object.authorId ? elevatedMenu : regularMenu}>
            <CaretDownFilled className="hover:text-blue-600 cursor-pointer" />
        </Dropdown>
    );
}
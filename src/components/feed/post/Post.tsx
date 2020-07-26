import React, { useState, useEffect } from "react";
import {
    FlagOutlined,
    CaretDownFilled,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { message, Menu, Button, Dropdown, Tooltip, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCommunityById } from "../../../api/community/Community";
import { getGlobalEmotes } from "../../../api/Emotes";
import { Link } from "react-router-dom";
import PostComments from "./comments/PostComments";
import PostVote from "./PostVote";
import History from "../../../api/History";
import PostReply from "./PostReply";
import { deletePost, Post } from "../../../api/Feeds";
import PostReport from "./PostReport";
import Vote from "../../../api/user/Vote";
import { User } from "../../../api/user/User";
import { parseBody, Emote } from "../../../api/Emotes";
import PostAbout from "./PostAbout";
import UserView from "../../view/UserView";

const { confirm } = Modal

type Props = {
    post: Post,
    vote: Vote,
    author: User,
    type?: string,
    feed: string
}

/**
 * A post
 */
export default ({ post, vote, author, type, feed }: Props): JSX.Element => {
    let [emotes, setEmotes] = useState([] as Emote[]);

    const confirmDelete = () => {
        confirm({
            title: "Are you sure you want to delete this post?",
            icon: <ExclamationCircleOutlined />,
            content: "You will not be able to get this post back if you delete it.",
            onOk() {
                deletePost(post.feed, post.id)
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    }

    // get emotes
    useEffect(() => {
        const loadEmotes = async () => {
            let request = await getGlobalEmotes();

            if (request.status === 200) {
                setEmotes(request.data);
            }
        };

        const loadCommunityEmotes = async (community: number) => {
            let obj = await getCommunityById(community);

            if (obj.status === 200) {
                setEmotes(obj.data.emotes);
            }
        };

        if (feed.startsWith("cf_")) {
            loadCommunityEmotes(+feed.substring(3));
        } else {
            loadEmotes();
        }
    }, [feed]);

    let self = useSelector((store: any) => store.auth.user);

    /**
     * Update focus.
     */
    const updateFocus = () => {
        History.push(`${window.location.pathname}/${post.id}`);
    };

    const elevatedMenu = (
        <Menu>
            <Menu.Item key={1}>
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
                <PostReport post={post} />
            </Menu.Item>
        </Menu>
    );

    const extendedMenu = (
        <Menu>
            <Menu.Item key={1}>
                <PostReport post={post} />
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="accent px-4 pt-4 rounded my-4 max-w-xs md:max-w-sm lg:max-w-md">
                <div className="flex flex-row justify-between">
                    {type !== "focused" && (
                        <a
                            href="#"
                            rel="noopener noreferrer nofollow"
                            className="text-lg"
                            onClick={() => updateFocus()}
                        >
                            {post.title}
                        </a>
                    )}

                    {type === "focused" && (
                        <p className="text-lg">{post.title}</p>
                    )}

                    <UserView username={author.username} />
                </div>
                <div className="post-content">
                    <p
                        className={type === "focused" ? "" : "truncate"}
                        dangerouslySetInnerHTML={{
                            __html: parseBody(post.content, emotes),
                        }}
                    />
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <PostVote post={post} vote={vote} />

                    <PostAbout date={post.createdAt} />

                    <Dropdown
                        overlay={
                            self.id === author.id ? elevatedMenu : extendedMenu
                        }
                    >
                        <CaretDownFilled className="hover:text-blue-600 cursor-pointer" />
                    </Dropdown>
                </div>

                {type === "focused" && (
                    <>
                        <PostReply post={post} level={0} feed={post.feed} />
                        <PostComments
                            feed={post.feed}
                            id={post.id}
                            data={null}
                        />
                    </>
                )}
            </div>
        </>
    );
}

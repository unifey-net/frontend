import React, { useState, useEffect } from "react";
import { UserView } from "../../api/user/View";
import {
    UpOutlined,
    DownOutlined,
    FlagOutlined,
    CaretDownFilled,
    DeleteOutlined,
    EditOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { message, Menu, Button, Dropdown, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { parseBody } from "../../api/Util";
import { getCommunityById } from "../../api/community/Community";
import { getGlobalEmotes } from "../../api/Emotes";
import { Link } from "react-router-dom"
import PostComments from "./PostComments";
import PostVote from "./PostVote";
import History from "../../api/History";

/**
 * A post
 * @param {*} props
 */
export default function Post(props) {
    const { post, vote, author, type } = props

    let [emotes, setEmotes] = useState([]);

    // get emotes
    useEffect(() => {
        const loadEmotes = async () => {
            let request = await getGlobalEmotes();

            if (request.status === 200) {
                setEmotes(request.data);
            }
        };

        const loadCommunityEmotes = async (community) => {
            let obj = await getCommunityById(community);

            if (obj.status === 200) {
                setEmotes(obj.data.emotes);
            }
        };

        if (props.feed.startsWith("cf_")) {
            loadCommunityEmotes(props.feed.substring(3));
        } else {
            loadEmotes();
        }
    }, [props.feed]);

    let self = useSelector((store) => store.auth.user);

    /**
     * Update focus.
     */
    const updateFocus = () => {
        History.push(`${window.location.pathname}/${post.id}`);
    }

    const reportPost = async () => {
        let key = "reporting-" + post.id;

        message.loading({ content: "Loading...", key });

        setTimeout(() => {
            message.success({
                content: "Successfully reported!",
                key,
                duration: 2,
            });
        }, 1000);
    };

    const elevatedMenu = (
        <Menu>
            <Menu.Item key="0">
                <span>
                    Edit <EditOutlined />
                </span>
            </Menu.Item>

            <Menu.Item key="1">
                <span>
                    Delete <DeleteOutlined />
                </span>
            </Menu.Item>

            <Menu.Item key="2">
                <span onClick={reportPost}>
                    Report <FlagOutlined />
                </span>
            </Menu.Item>
        </Menu>
    );

    const extendedMenu = (
        <Menu>
            <Menu.Item key="0">
                <span onClick={reportPost}>
                    Report <FlagOutlined />
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="accent px-4 pt-4 rounded my-4 max-w-xs md:max-w-sm lg:max-w-md">
                <div className="flex flex-row justify-between">
                    {type !== "focused" && (
                        <Link className="text-lg" onClick={() => updateFocus()}>
                            {post.title}
                        </Link>
                    )}
                    {type === "focused" && (
                        <p className="text-lg">
                            {post.title}
                        </p>
                    )}
                    <UserView username={author.username} />
                </div>
                <div className="post-content">
                    <p
                        className={props.type === "focused" ? "" : "truncate"}
                        dangerouslySetInnerHTML={{
                            __html: parseBody(post.content, emotes),
                        }}
                    />
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <PostVote post={post} voteObj={vote} />
                    <span className="invisible lg:visible">
                        Posted on {new Date(post.createdAt).toLocaleString()}
                    </span>
                    <Dropdown
                        overlay={
                            self.id === author.id ? elevatedMenu : extendedMenu
                        }
                    >
                        <CaretDownFilled className="hover:text-blue-600 cursor-pointer" />
                    </Dropdown>
                </div>

                {type === "focused" && (
                    <PostComments feed={post.feed} id={post.id} />
                )}
            </div>
        </>
    );
}

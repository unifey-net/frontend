import React, { useState, useEffect } from "react";
import { UserView } from "../../api/user/View";
import {
    UpOutlined,
    DownOutlined,
    FlagOutlined,
    CaretDownFilled,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { message, Menu, Button, Dropdown, Tooltip } from "antd";
import { BASE_URL } from "../../api/ApiHandler";
import { signedIn, getToken } from "../../api/user/User";
import { useSelector } from "react-redux";
import { votePost } from "../../api/Feeds";
import { parseBody } from "../../api/Util";
import { getCommunityById } from "../../api/community/Community";
import { getGlobalEmotes } from "../../api/Emotes";

/**
 * A post
 * @param {*} props
 */
export default function Post(props) {
    let [vote, setVote] = useState(props.post.upvotes - props.post.downvotes);
    let [hasDownVoted, setDownVoted] = useState(false);
    let [hasUpVoted, setUpVoted] = useState(false);
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

    useEffect(() => {
        if (props.vote != null) {
            if (props.vote.vote === 1) {
                setUpVoted(true);
            } else if (props.vote.vote === 0) {
                setDownVoted(true);
            }
        }
    }, [props.vote]);

    /**
     * Update the vote on the backend.
     * @param {int} type
     */
    const sendVote = async (type) => {
        if (!signedIn()) {
            return;
        }

        let response = await votePost(props.post.id, type);

        if (response.status !== 200) {
            message.error("There was an issue upvoting that post!");
        }
    };

    const upVote = () => {
        if (!signedIn()) {
            return;
        }

        if (hasUpVoted) {
            setVote((prevVote) => prevVote - 1);
            setUpVoted(false);

            sendVote(-1);
        } else if (hasDownVoted) {
            setVote((prevVote) => prevVote + 2);
            setUpVoted(true);
            setDownVoted(false);

            sendVote(1);
        } else {
            setVote((prevVote) => prevVote + 1);
            setUpVoted(true);

            sendVote(1);
        }
    };

    const downVote = () => {
        if (!signedIn()) {
            return;
        }

        if (hasUpVoted) {
            setVote((prevVote) => prevVote - 2);

            setDownVoted(true);
            setUpVoted(false);

            sendVote(0);
        } else if (hasDownVoted) {
            setVote((prevVote) => prevVote + 1);

            setDownVoted(false);

            sendVote(-1);
        } else {
            setVote((prevVote) => prevVote - 1);

            setDownVoted(true);

            sendVote(0);
        }
    };

    const reportPost = async () => {
        let key = "reporting-" + props.post.id;

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
        <div
            className="px-4 pt-4 rounded my-4 max-w-xs md:max-w-sm lg:max-w-md"
            style={{
                backgroundColor: "#171616",
                maxHeight: "200px",
            }}
        >
            <div className="flex flex-row justify-between">
                <h2 className="text-lg">{props.post.title}</h2>
                <UserView username={props.author.username} />
            </div>
            <div className="post-content">
                <p
                    className="truncate"
                    dangerouslySetInnerHTML={{
                        __html: parseBody(props.post.content, emotes),
                    }}
                />
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-between gap-2">
                    <p className={hasUpVoted ? "text-green-400" : ""}>
                        <Tooltip title="Upvote this post">
                            <UpOutlined onClick={upVote} />
                        </Tooltip>
                    </p>
                    <p className={hasDownVoted ? "text-red-600" : ""}>
                        <Tooltip title="Downvote this post">
                            <DownOutlined onClick={downVote} />
                        </Tooltip>
                    </p>
                    <p>{vote}</p>
                </div>
                    <span className="invisible lg:visible">
                        Posted on {new Date(props.post.createdAt).toLocaleString()}
                    </span>
                    <Dropdown
                        overlay={
                            self.id === props.author.id
                                ? elevatedMenu
                                : extendedMenu
                        }
                    >
                            <CaretDownFilled className="hover:text-blue-600 cursor-pointer" />
                    </Dropdown>
            </div>
        </div>
    );
}

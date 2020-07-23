import React, { useState, useEffect } from "react";
import { signedIn } from "../../api/user/User";
import { votePost } from "../../api/Feeds";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Tooltip, message } from "antd";

export default function PostVote(props) {
    let { voteObj, post, type } = props;

    let [vote, setVote] = useState(post.upvotes - post.downvotes);

    let [hasDownVoted, setDownVoted] = useState(false);
    let [hasUpVoted, setUpVoted] = useState(false);

    useEffect(() => {
        if (voteObj != null) {
            if (voteObj.vote === 1) {
                setUpVoted(true);
            } else if (voteObj.vote === 0) {
                setDownVoted(true);
            }
        }
    }, [voteObj]);

    /**
     * Update the vote on the backend.
     * @param {int} type
     */
    const sendVote = async (type) => {
        if (!signedIn()) {
            return;
        }
        let response = await votePost(post.feed, post.id, type);

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

    return (
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
    );
}

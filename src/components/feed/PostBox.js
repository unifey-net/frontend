import React, { useState } from "react";
import { getToken } from "../../api/user/User";
import { message, Input, Button, Modal, Tooltip } from "antd";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import { BASE_URL } from "../../api/ApiHandler";
import { postFeed } from "../../api/Feeds";

const { TextArea } = Input;

export default function PostBox(props) {
    let [visible, setVisible] = useState(false);
    let [loading, setLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async (e) => {
        setLoading(true);

        let title = document.querySelector("#title");
        let content = document.querySelector("#content");

        if (title.value === "" || content.value === "") {
            document.querySelector("#status").textContent =
                "You are missing a title or body!";
            setLoading(false);
            return;
        }

        let response = await postFeed(props.feed, content.value, title.value)

        setLoading(false);
        setVisible(false);

        if (response.status !== 200) {
            message.error("There was an issue posting that.")
        } else {
            message.success("Successfully posted!");
        }

        props.action();
    };

    const handleCancel = (e) => {
        setVisible(false);
    };

    return (
        <div className="post-box-container">
            <Button type="link" onClick={showModal}>
                Create Post
            </Button>

            <Modal
                title="Create new Post"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Input id="title" placeholder="Title" />

                <br />
                <br />

                <TextArea
                    id="content"
                    placeholder="Body"
                    autoSize={{ minRows: 3 }}
                />

                <br />
                <br />

                <p id="status" />
            </Modal>
        </div>
    );
}

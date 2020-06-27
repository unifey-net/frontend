import React, { useState } from "react";
import { getToken } from "../api/AuthenticationManager";
import { message, Input, Button, Modal } from "antd";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import { BASE_URL } from "../api/ApiHandler";

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

        let formData = new FormData();

        formData.append("content", content.value);
        formData.append("title", title.value);

        await fetch(`${BASE_URL}/feeds/${props.feed}`, {
            method: "POST",
            headers: {
                Authorization: "bearer " + getToken(),
            },
            body: formData,
        });

        setLoading(false);
        setVisible(false);

        props.action();
        message.success("Successfully posted!");
    };

    const handleCancel = (e) => {
        setVisible(false);
    };

    return (
        <div className="post-box-container">
            <Button type="primary" onClick={showModal}>
                <PlusCircleOutlined />
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

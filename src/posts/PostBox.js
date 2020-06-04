import React from "react";
import {getOtherUserDataById, getToken} from "../api/AuthenticationManager";
import UserView from "../api/user/UserView";
import {DownOutlined, FlagOutlined, UpOutlined} from "@ant-design/icons";
import Popconfirm from "antd/es/popconfirm";
import {message, Input, Button, Modal} from "antd";
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";

export default class PostBox extends React.Component {
    state = {
        visible: false,
        loading: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({ loading: true })

        let title = document.querySelector("#title")
        let content = document.querySelector("#content")

        if (title.value === "" || content.value === "") {
            document.querySelector("#status").textContent = "You are missing a title or body!"
            this.setState({ loading: false })
            return
        }

        let formData = new FormData()

        formData.append("content", content.value)
        formData.append("title", title.value)

        fetch(`http://localhost:8080/feeds/${this.props.feed}`, {
            method: 'POST',
            headers: {
                "Authorization": "bearer " + getToken()
            },
            body: formData
        })
            .then((resp) => {
                this.setState({ loading: false, visible: false });

                this.props.action()
                message.success("Successfully posted!")
            })

    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { TextArea } = Input;

        return (
            <div className="post-box-container">
                <Button type="primary" onClick={this.showModal}>
                    <PlusCircleOutlined />
                </Button>

                <Modal
                    title="Create new Post"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Input id="title" placeholder="Title" />
                    <br />
                    <br />
                    <TextArea id="content" placeholder="Body" autoSize={{ minRows: 3 }} />
                    <br/>
                    <br/>
                    <p id="status"/>
                </Modal>
            </div>
        );
    }
}

import React from "react";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import { signedIn, getUserData } from "../handle/AuthenticationManager";
import { Link } from "react-router-dom"

export default class UserView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "Signed Out"
        }
    }

    componentDidMount() {
        if (signedIn()) {
            getUserData((success, data) => {
                if (success) {
                    this.setState({
                        username: data.username
                    })

                    this.render()
                }
            })
        }
    }

    render() {
        if (this.state.username === "Signed Out") {
            return (
                <div className="user">
                    <span className="name"><Link to={`/login`}>{this.state.username}</Link> <Avatar size={38} className="avatar" icon={<UserOutlined/>}/></span>
                </div>
            );
        }

        return (
            <div className="user">
                <span className="name"><Link to={`/@${this.state.username}`}>{this.state.username}</Link> <Avatar size={38} className="avatar" icon={<UserOutlined/>}/></span>
            </div>
        );
    }
}

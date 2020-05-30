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

        if (signedIn()) {
            getUserData((success, data) => {
                if (success) {
                    this.setState({
                        username: data.username
                    })

                    this.render();
                }
            })
        }
    }

    // TODO change back to Link maybe?
    render() {
        if (this.state.username === "Signed Out") {
            return (
                <div className="user">
                    <span className="name"><a href={`/login`}><Avatar size={38} className="avatar" src={<UserOutlined/>}/></a></span>
                </div>
            );
        }

        return (
            <div className="user">
                <span className="name"><a href={`/@${this.state.username}`}><Avatar size={38} className="avatar" src={`http://localhost:8080/user/name/${this.state.username}/picture`}/></a></span>
            </div>
        );
    }
}

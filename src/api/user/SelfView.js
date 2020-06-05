import React from "react";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {getSelf, getUserByName, signedIn} from "../AuthenticationManager";

export default class SelfView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            signedIn: false
        }
    }

    componentDidMount() {
        console.log("Signed In: " + signedIn())
        if (signedIn()) {


            getSelf((data) => {
                console.log(data);
                if (data != null) {
                    this.setState({
                        username: data.username,
                        signedIn: true
                    })
                }
            })
        }
    }

    render() {
        if (!this.state.signedIn) {
            return (
                <div className="user">
                    <span className="name"><a href={`/login`}><Avatar size={38} className="avatar" icon={<UserOutlined/>}/></a></span>
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

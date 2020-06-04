import React from "react";
import {Avatar} from "antd";
import {BASE_URL} from "../ApiHandler";

export default class UserView extends React.Component {
    render() {
        return (
            <div className="user">
                <span className="name"><a href={`/@${this.props.username}`}><Avatar size={38} src={`${BASE_URL}/user/name/${this.props.username}/picture`}/></a></span>
            </div>
        );
    }
}

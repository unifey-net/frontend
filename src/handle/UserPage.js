import {useRouteMatch} from "react-router-dom";
import ReactDOM from 'react-dom';
import React from "react";
import "../assets/scss/pages/viewuser.scss"
import Feed from "../posts/Feed";


import { CalendarOutlined, GlobalOutlined } from "@ant-design/icons"

import {Descriptions, Empty} from "antd";
import MessageOutlined from "@ant-design/icons/lib/icons/MessageOutlined";
import Avatar from "antd/es/avatar";
import {getUserByName} from "../api/AuthenticationManager";

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: this.props.name,
            createdAt: 0,
            profile: {
                location: "N/A",
                discord: "N/A"
            }
        }
    }

    componentDidMount() {
        getUserByName(this.props.name, (data) => {
            if (data != null) {
                this.setState({
                    id: data.id,
                    name: data.username,
                    createdAt: data.createdAt,
                    profile: {
                        location: data.profile.location,
                        discord: data.profile.discord,
                        description: data.profile.description
                    }
                })

                ReactDOM.render(<Feed id={`uf_${this.state.id}`}/>, document.getElementById("user-feed"))
            } else {
                ReactDOM.render(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />, document.getElementById("user-container"))
            }
        })
    }

    render() {
        let location;
        if (this.state.profile.location !== "") {
            location = (
                <Descriptions.Item label={<span>Location <GlobalOutlined /></span>}>
                    {this.state.profile.location}
                </Descriptions.Item>
            )
        } else {
            location = (<div/>)
        }

        let discord;
        if (this.state.profile.discord !== "") {
            discord = (
                <Descriptions.Item label={<span>Discord <MessageOutlined /></span>}>
                    {this.state.profile.discord}
                </Descriptions.Item>
            )
        } else {
            discord = (<div/>)
        }

        return (
            <div className="user-container" id="user-container">
                <Descriptions title={<h1>{this.state.name} <Avatar size={112} src={`http://localhost:8080/user/name/${this.state.name}/picture`}/></h1>}>
                    <Descriptions.Item label={<span>Joined <CalendarOutlined/></span>}>
                        {new Date(this.state.createdAt).toLocaleString()}
                    </Descriptions.Item>
                    {location}
                    {discord}
                </Descriptions>

                <br/>

                <div id="user-feed"/>
            </div>
        );
    }
}

export default function ViewUser() {
    const {
        params: { user }
    } = useRouteMatch()

    return (<UserPage name={user} />)
}

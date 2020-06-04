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
import {getCommunityByName} from "../api/CommunityHandler";
import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";

class CommunityPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: this.props.name,
            createdAt: 0,
            desc: "",
            feed: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
    }

    componentDidMount() {
        getCommunityByName(this.props.name, (data) => {
            console.log(data);

            if (data != null) {
                this.setState({
                    id: data.community.id,
                    name: data.community.name,
                    createdAt: data.community.createdAt,
                    desc: data.community.description,
                    feed: <Feed id={`cf_${data.community.id}`}/>
                })
            } else {
                ReactDOM.render(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />, document.getElementById("user-container"))
            }
        })
    }

    render() {
        return (
            <div className="user-container" id="user-container">
                <Descriptions title={<h1>{this.state.name} <Avatar size={112} src={`http://localhost:8080/community/${this.state.id}/picture`}/></h1>}>
                    <Descriptions.Item label={<span>Created <CalendarOutlined/></span>}>
                        {new Date(this.state.createdAt).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label={<span>Description <BookOutlined/></span>}>
                        {this.state.desc}
                    </Descriptions.Item>
                </Descriptions>
                <br/>

                <div id="community-feed">
                    {this.state.feed}
                </div>
            </div>
        );
    }
}

export default function ViewCommunity() {
    const {
        params: { community }
    } = useRouteMatch()

    return (<CommunityPage name={community} />)
}

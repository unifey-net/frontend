import React from "react";
import UserView from "../api/user/UserView";
import { UpOutlined, DownOutlined, FlagOutlined } from "@ant-design/icons";
import Popconfirm from "antd/es/popconfirm";
import { message } from "antd"
import {getUserById} from "../api/AuthenticationManager";

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vote: 0,
            upVoted: false,
            author: this.props.author,
            downVoted: false
        }
    }

    render() {
       return (
           <div className="post-container">
               <div className="post-title">
                   <p className="title">{this.props.title}</p>
                   <UserView username={this.state.author}/>
               </div>
               <div className="post-content">
                   <p>{this.props.content}</p>
               </div>
               <div className="post-management">
                   <div className="vote-container">
                       <p className={this.state.upVoted ? "upvoted" : ""}><UpOutlined onClick={(e) => this.upVote() }/></p>
                       <p className={this.state.downVoted ? "downvoted" : ""}><DownOutlined onClick={(e) => this.downVote()} /></p>
                       <p>{this.state.vote}</p>
                   </div>
                   <Popconfirm
                       title="Are you sure you want to report this?"
                       onConfirm={() => {
                           let key = "reporting-" + this.props.id

                           message.loading({ content: 'Loading...', key });

                           setTimeout(() => {
                               message.success({ content: "Successfully reported!", key, duration: 2 });
                           }, 1000);

                           // TODO
                       }}
                       onCancel={() => {}}
                       okText="Yes"
                       cancelText="No"
                   >
                       <FlagOutlined/>
                   </Popconfirm>
               </div>
           </div>
       );
    }

    downVote() {
        if (this.state.downVoted) {
            this.setState({
                downVoted: false,
                vote: this.state.vote + 1
            })
        } else if (this.state.upVoted) {
            this.setState({
                downVoted: true,
                upVoted: false,
                vote: this.state.vote - 2
            })
        } else {
            this.setState({
                downVoted: true,
                vote: this.state.vote - 1
            })
        }
    }

    upVote() {
        if (this.state.upVoted) {
            this.setState({
                upVoted: false,
                vote: this.state.vote - 1
            })
        } else if (this.state.downVoted) {
            this.setState({
                upVoted: true,
                downVoted: false,
                vote: this.state.vote + 2
            })
        } else {
            this.setState({
                upVoted: true,
                downVoted: false,
                vote: this.state.vote + 1
            })
        }
    }
}

import React from "react";
import UserView from "./UserView";
import { UpOutlined, DownOutlined, FlagOutlined } from "@ant-design/icons";

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            upVote: 5000000,
            downVote: 10000,
            upVoted: false,
            downVoted: false
        }
    }

    render() {
       return (
           <div className="post-container">
               <div className="post-title">
                   <p className="title">{this.props.title}</p>
                   <UserView id={this.props.owner}/>
               </div>
               <div className="post-content">
                   <p>{this.props.content}</p>
               </div>
               <div className="post-management">
                   <div className="votes">
                       <p className={this.state.upVoted ? "upvoted" : ""}><UpOutlined onClick={(e) => this.upvote() }/> {this.state.upVote}</p>

                       <p className={this.state.downVoted ? "downvoted" : ""}><DownOutlined onClick={(e) => this.downvote()} /> {this.state.downVote}</p>
                   </div>
                   <p className="report"><FlagOutlined onClick={(e) => this.report(e)} /></p>
               </div>
           </div>
       );
    }

    downvote() {
        if (this.state.downVoted)
            this.setState({downVote: this.state.downVote - 1})
        else this.setState({downVote: this.state.downVote + 1})

        if (this.state.upVoted) {
            this.setState({upVote: this.state.upVote - 1})
            this.setState({upVoted: false})
        }

        this.setState({downVoted: !this.state.downVoted})
    }

    upvote() {
        if (this.state.upVoted)
            this.setState({upVote: this.state.upVote - 1})
        else this.setState({upVote: this.state.upVote + 1})

        if (this.state.downVoted) {
            this.setState({downVote: this.state.downVote - 1})
            this.setState({downVoted: false})
        }

        this.setState({upVoted: !this.state.upVoted})
        this.setState({downVoted: false})

    }

    /**
     * Todo: Implement reporting posts.
     *
     * @param e
     */
    report(e) {
        alert("Report Invoked for: " + this.props.title)
    }
}

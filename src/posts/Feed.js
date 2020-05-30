import React from "react"
import Post from "./Post.js"
import "../assets/scss/pages/feed.scss"
import Card from "antd/es/card";
import UserView from "./UserView";
import {getToken} from "../handle/AuthenticationManager";

import { ReactDOM } from "react-dom"
import PostBox from "./PostBox";

export default class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.getPosts = this.getPosts.bind(this);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts() {
        console.log("invoke andy")
        fetch(`http://localhost:8080/feeds/${this.props.id}`, {
            method: 'GET',
            headers: {
                "Authorization": "bearer " + getToken()
            }
        })
            .then((resp) => {
                console.log(resp.ok);
                console.log(resp.status);
                resp.text()
                    .then((content) => {
                        let js = JSON.parse(content).payload

                        let posts = []
                        for (let i = 0; js.length > i; i++) {
                            let post = js[i]

                            posts.push(post);
                        }

                        posts.sort(function(a,b){
                            return new Date(a.createdAt) - new Date(b.createdAt)
                        });

                        this.setState({
                            posts: posts
                        })

                        this.render()
                    })
            })

    }

    render() {
        return (
            <div>
                <PostBox feed={this.props.id} action={this.getPosts} />
                <ul className="feed-container">
                    {
                        this.state.posts.map((post, index) =>
                            <li key={index}>
                                <Post id={post.id} created={post.createdAt} title={post.title} content={post.content} vote={post.upvotes - post.downvotes} author={post.authorUid}/>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

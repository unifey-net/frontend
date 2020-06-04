import React from "react"
import Post from "./Post.js"
import "../assets/scss/pages/feed.scss"
import Card from "antd/es/card";
import UserView from "../api/user/UserView";
import {getToken} from "../api/AuthenticationManager";

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
        fetch(`http://localhost:8080/feeds/${this.props.id}`, {
            method: 'GET',
            headers: {
                "Authorization": "bearer " + getToken()
            }
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.text().then((content) => {
                            let js = JSON.parse(content).posts

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
                        })
                } else resp.text().then((text) => console.log(text))
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
                                <Post id={post.post.id} created={post.post.createdAt} title={post.post.title} content={post.post.content} vote={post.post.upvotes - post.post.downvotes} author={post.owner.username}/>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

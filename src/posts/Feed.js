import React from "react"
import Post from "./Post.js"
import "../assets/scss/pages/feed.scss"

export default class Feed extends React.Component {
    render() {
        return (
            <ul className="feed-container">
                <li>
                    <Post title="Wow this sho dude is very cool" content="hahaha ha just kdifing 777777" owner="not sho"/>
                    <Post title="op pls" content="i am owner no a" owner="a"/>
                </li>
            </ul>
        );
    }
}

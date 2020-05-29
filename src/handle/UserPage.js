import {useRouteMatch} from "react-router-dom";
import ReactDOM from 'react-dom';
import React from "react";
import "../assets/scss/pages/viewuser.scss"
import Feed from "../posts/Feed";
import {getOtherUserData} from "./AuthenticationManager";

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: this.props.name,
            createdAt: 0
        }

        getOtherUserData(this.props.name, (success, data) => {
            if (success) {
                this.setState({
                    id: data.id,
                    name: data.username,
                    createdAt: data.createdAt
                })
            }
        })
    }

    render() {
        return (
            <div className="user-container">
                <h1 id="user-title">{this.state.name}</h1>
                <p id="created-on">Account created on {new Date(this.state.createdAt).toLocaleString()}</p>

                <br />

                <Feed id={`uf_${this.state.id}`} />
            </div>
        );
    }
}

export default function ViewUser() {
    const {
        params: { user }
    } = useRouteMatch()

    return (<UserPage name={user}/>);
}

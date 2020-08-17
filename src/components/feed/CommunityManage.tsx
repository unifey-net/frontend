import React from "react"
import { Button, message } from "antd";
import { leaveCommunity, joinCommunity, signedIn } from "../../api/user/User";
import { useSelector } from "react-redux";

type Props = {
    community: number,
    className?: string,
}

/**
 * Either leaving or joining a community. Will give a button that gives the option to join or leave depending on member status.
 */
export default ({ community, className }: Props): JSX.Element => {
    let self = useSelector((store: any) => store.auth.user);

    const joinLeave = async () => {
        if (self.member.members.includes(community)) {
            let request = await leaveCommunity(community);

            if (request.status === 200) {
                message.success("Successfully left community!");
            } else {
                message.error("Failed to leave community!");
            }
        } else {
            let request = await joinCommunity(community);

            if (request.status === 200) {
                message.success("Successfully joined community!");
            } else {
                message.error("Failed to join community!");
            }
        }
    };
    
    return (
        <Button className={className} disabled={!signedIn()} danger ghost onClick={() => joinLeave()}>
            {self.member.members.includes(community) ? "Leave" : "Join"}
        </Button>
    );
}
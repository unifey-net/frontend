import React from "react"
import { Button } from "antd"
import { leaveCommunity, joinCommunity, signedIn } from "../../api/user/User"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import ToastTheme from "../../api/ToastTheme"

type Props = {
    community: number
    className?: string
    type: "BUTTON" | "TEXT"
}

/**
 * Either leaving or joining a community. Will give a button that gives the option to join or leave depending on member status.
 */
const CommunityManage: React.FC<Props> = ({ community, className, type }) => {
    let self = useSelector((store: any) => store.auth.user)

    const joinLeave = async () => {
        if (self.member.members.includes(community)) {
            let request = await leaveCommunity(community)

            if (request.status === 200) {
                toast.success("Successfully left community!", ToastTheme)
            } else {
                toast.error(request.data.payload, ToastTheme)
            }
        } else {
            let request = await joinCommunity(community)

            if (request.status === 200) {
                toast.success("Successfully joined community!", ToastTheme)
            } else {
                toast.error(request.data.payload, ToastTheme)
            }
        }
    }

    if (type === "BUTTON") {
        return (
            <Button
                className={className}
                disabled={!signedIn()}
                danger
                ghost
                onClick={() => joinLeave()}
            >
                {self.member.members.includes(community) ? "Leave" : "Join"}
            </Button>
        )
    } else {
        const hover = signedIn() ? "cursor-pointer" : "cursor-not-allowed"

        return (
            <span
                className={`${className} ${hover} hover:text-gray-400`}
                onClick={() => {
                    if (signedIn()) {
                        joinLeave()
                    }
                }}
            >
                {self.member.members.includes(community) ? "Leave" : "Join"}
            </span>
        )
    }
}

export default CommunityManage
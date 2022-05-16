import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Input, message } from "antd"
import { Rule } from "./CommunityRules"
import {
    deleteCommunityRule,
    updateCommunityRuleBody,
    updateCommunityRuleTitle,
} from "../../../../api/community/Rules"
import LinkButton from "../../../LinkButton"
import { useAppDispatch } from "../../../../util/Redux"
import { removeRule } from "../../../../api/community/redux/community.redux"

type Props = {
    rule: Rule
    community: number
    index: number
    update: () => void
}

/**
 * An individual rule for a community.
 */
const CommunityRule: React.FC<Props> = ({ rule, community, index, update }) => {
    let dispatch = useAppDispatch()

    let [bodyState, setBodyState] = React.useState("")
    let [titleState, setTitleState] = React.useState("")

    const { id } = rule

    const [title, setTitle] = useState(rule.title)
    const [body, setBody] = useState(rule.body)

    const [manage, setManage] = useState(false)
    const [loading, setLoading] = useState(false)

    /**
     * Save the changes to the rule.
     */
    const save = async () => {
        setLoading(true)

        if (body !== bodyState) {
            let request = await updateCommunityRuleBody(
                community,
                id,
                bodyState
            )

            if (request.status !== 200) {
                message.error(request.data.payload)
            } else {
                setBody(bodyState)
            }
        }

        if (title !== titleState) {
            let request = await updateCommunityRuleTitle(
                community,
                id,
                titleState
            )

            if (request.status !== 200) {
                message.error(request.data.payload)
            } else {
                setTitle(titleState)
            }
        }

        setLoading(false)
        setManage(false)
    }

    /**
     * Delete a rule.
     */
    const deleteRule = async () => {
        let request = await deleteCommunityRule(community, id)

        if (request.status !== 200) {
            message.error(request.data.payload)
        } else {
            dispatch(removeRule({ community, id }))
            message.success("Rule has been successfully deleted.")
        }

        update()
    }

    return (
        <li>
            <div
                className={`p-4 border-black mb-2 rounded accent flex flex-row justify-between`}
            >
                <div className="flex flex-row gap-2 -mb-4">
                    <p className="">
                        <b>#{index + 1}.</b>
                    </p>

                    {manage && (
                        <Input
                            size="small"
                            onChange={val => setBodyState(val.target.value)}
                            value={bodyState}
                            defaultValue={title}
                        />
                    )}
                    {!manage && (
                        <p>
                            <b>{title}</b> —
                        </p>
                    )}

                    {!manage && <p>{body}</p>}

                    {manage && (
                        <Input
                            size="small"
                            onChange={val => setBodyState(val.target.value)}
                            value={bodyState}
                            defaultValue={body}
                        />
                    )}
                </div>

                <div className={`flex flex-row gap-2`}>
                    <LinkButton onClick={() => setManage(prev => !prev)}>
                        Edit
                    </LinkButton>

                    <LinkButton onClick={deleteRule}>Delete</LinkButton>

                    {manage && (
                        <LinkButton onClick={save} loading={loading}>
                            Save
                        </LinkButton>
                    )}
                </div>
            </div>
        </li>
    )
}

export default CommunityRule

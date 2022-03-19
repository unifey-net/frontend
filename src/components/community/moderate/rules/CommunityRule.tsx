import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { InputRef, message } from "antd"
import { Rule } from "./CommunityRules"
import { deleteCommunityRule, updateCommunityRuleBody, updateCommunityRuleTitle } from "../../../../api/community/Rules"
import LinkButton from "../../../LinkButton"
import { useAppDispatch } from "../../../../util/Redux"
import { removeRule } from "../../../../api/community/redux/community.redux"
import Input from "rc-input"

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

    let bodyRef = React.createRef<InputRef>()
    let titleRef = React.createRef<InputRef>()

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

        let bodyValue = bodyRef.current!!.input!!.value
        let titleValue = titleRef.current!!.input!!.value

        if (body !== bodyValue) {
            let request = await updateCommunityRuleBody(community, id, bodyValue)

            if (request.status !== 200) {
                message.error(request.data.payload)
            } else {
                setBody(bodyValue)
            }
        }

        if (title !== titleValue) {
            let request = await updateCommunityRuleTitle(community, id, titleValue)

            if (request.status !== 200) {
                message.error(request.data.payload)
            } else {
                setTitle(titleValue)
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
            <div>
                <div>
                    <p className="">
                        <b>#{index + 1}.</b>
                    </p>

                    {manage && (
                        <Input
                            ref={titleRef}
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
                            ref={bodyRef}
                            defaultValue={body}
                        />
                    )}
                </div>

                <div>
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

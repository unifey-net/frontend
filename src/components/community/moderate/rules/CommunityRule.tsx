import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Input, message } from "antd"
import { Rule } from "./CommunityRules"
import { removeRule } from "../../../../redux/actions/community.actions"
import { API } from "../../../../api/ApiHandler"
import ButtonText from "../../../ButtonText"

type Props = {
    rule: Rule
    community: number
    index: number
    update: () => void
}

/**
 * An individual rule for a community.
 */
export default ({ rule, community, index, update }: Props) => {
    let dispatch = useDispatch()

    let bodyRef = React.createRef<Input>()
    let titleRef = React.createRef<Input>()

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

        let bodyValue = bodyRef.current!!.state.value
        let titleValue = titleRef.current!!.state.value

        if (body !== bodyValue) {
            let form = new FormData()

            form.append("id", `${id}`)
            form.append("body", `${bodyValue}`)

            let request = await API.patch(
                `/community/${community}/rules/body`,
                form
            )

            if (request.status !== 200) {
                message.error(request.data.payload)
            } else {
                setBody(bodyValue)
            }
        }

        if (title !== titleValue) {
            let form = new FormData()

            form.append("id", `${id}`)
            form.append("title", `${titleValue}`)

            let request = await API.patch(
                `/community/${community}/rules/title`,
                form
            )

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
        let request = await API.delete(`/community/${community}/rules/${id}`)

        if (request.status !== 200) {
            message.error(request.data.payload)
        } else {
            dispatch(removeRule(community, id))
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
                        <Input size="small" className="-py-4" ref={bodyRef} defaultValue={body} />
                    )}
                </div>

                <div className={`flex flex-row gap-2`}>
                    <ButtonText onClick={() => setManage(prev => !prev)}>
                        Edit
                    </ButtonText>

                    <ButtonText onClick={deleteRule}>Delete</ButtonText>

                    {manage && (
                        <ButtonText onClick={save} loading={loading}>
                            Save
                        </ButtonText>
                    )}
                </div>
            </div>
        </li>
    )
}

import React, { useState } from "react"
import useRuleModal from "./useRuleModal"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import ModeratePage from "../ModeratePage"
import CommunityRule from "./CommunityRule"

/**
 * A communities' rule.
 */
export type Rule = {
    title: string
    body: string
    id: number
}

type Props = {
    community: CommunityRequest
    type?: string
}

/**
 * The communities rules. This appears on the far right sidebar.
 */
const CommunityRules: React.FC<Props> = ({ community, type }) => {
    let rules = community.community.rules

    let [showing, setShowing] = useState(5)
    let [toggle, modal] = useRuleModal(community.community.id)

    // TODO: i don't know man....
    let [update, setUpdate] = useState(0)

    /**
     * The "show more" button. This shows 5 (or til it reaches the max) more
     */
    const showMore = () => {
        setShowing(prev => prev + 5)
    }

    return (
        <ModeratePage>
            {modal}

            <ol>
                {rules.length !== 0 &&
                    Object.keys(rules)
                        .slice(0, showing)
                        .map((key, index: number) => {
                            const { body, title, id } = rules[key]
                            return (
                                <CommunityRule
                                    rule={{ title, body, id }}
                                    index={index}
                                    community={community.community.id}
                                    update={() => setUpdate(update + 1)}
                                />
                            )
                        })}

                {Object.keys(rules).length === 0 && (
                    <p>There are no rules in this community.</p>
                )}
            </ol>

            <div className="flex flex-row justify-between">
                {rules.length > showing && (
                    <span
                        className="cursor-pointer text-gray-600 hover:text-gray-500"
                        onClick={showMore}
                    >
                        Show{" "}
                        {rules.length - showing >= 5
                            ? 5
                            : rules.length - showing}{" "}
                        more
                    </span>
                )}

                {30 > rules.length && (
                    <span
                        className="cursor-pointer text-gray-600 hover:text-gray-500"
                        onClick={toggle}
                    >
                        Create new
                    </span>
                )}
            </div>
        </ModeratePage>
    )
}

export default CommunityRules

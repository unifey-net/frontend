import React, { useState } from "react"
import CommunityRule from "./CommunityProfileRule"
import { CommunityRequest } from "../../../api/community/CommunityUtil"
import styled from "styled-components"

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
}

const CommunityRulesStyles = styled.div`
    background-color: ${({ theme }) => theme.primary};
    padding: 8px;
    max-width: 200px;
    border-radius: 32px;

    .rules {
        display: flex;
        flex-direction: column;
    }
`

/**
 * The communities rules. This appears on the far right sidebar.
 */
export default ({ community }: Props) => {
    let rules = community.community.rules

    let [showing, setShowing] = useState(5)

    /**
     * The "show more" button. This shows 5 (or til it reaches the max) more
     */
    const showMore = () => {
        setShowing(prev => prev + 5)
    }

    return (
        <CommunityRulesStyles>
            <div className="rules">
                {rules.length !== 0 &&
                    Object.keys(rules)
                        .slice(0, showing)
                        .map((key, index: number) => {
                            const { body, title, id } = rules[key]
                            return (
                                <CommunityRule
                                    rule={{ title, body, id }}
                                    index={index}
                                    key={index}
                                />
                            )
                        })}

                {Object.keys(rules).length === 0 && (
                    <p>There are no rules in this community.</p>
                )}
            </div>

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
            </div>
        </CommunityRulesStyles>
    )
}

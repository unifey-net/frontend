import React, { useState } from "react"
import { Rule } from "./CommunityProfileRules"
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons"
import styled from "styled-components"

type Props = {
    rule: Rule
    index: number
}

const CommunityProfileStyle = styled.div`
    .rule {
        display: flex;
        flex-direction: row;

        gap: 2px;
        justify-content: space-between;

        .title {
            display: flex;
            flex-direction: row;

            gap: 2px;
        }
    }

    .rule-body {
    }
`

/**
 * An individual rule for a community.
 */
const CommunityProfileRule: React.FC<Props> = ({ rule, index }) => {
    const [extended, setExtended] = useState(false)

    /**
     * Extend the rule.
     */
    const extend = () => setExtended(prev => !prev)

    /**
     * The thing that extends the rule when clicking on it.
     */
    let caret = extended ? (
        <CaretDownOutlined className="mt-2" onClick={extend} />
    ) : (
        <CaretRightOutlined className="mt-1" onClick={extend} />
    )

    return (
        <CommunityProfileStyle>
            <div className="rule">
                <div className="title">
                    <p className="">#{index + 1}.</p>
                    <p>{rule.title}</p>
                </div>

                {caret}
            </div>

            {extended && <p className="rule-body">- {rule.body}</p>}
        </CommunityProfileStyle>
    )
}

export default CommunityProfileRule

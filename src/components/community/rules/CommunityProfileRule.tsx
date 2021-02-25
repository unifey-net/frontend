import React, { useState } from "react"
import { Rule } from "./CommunityProfileRules"
import {
    CaretDownOutlined,
    CaretRightOutlined,
} from "@ant-design/icons"

type Props = {
    rule: Rule
    index: number
}

/**
 * An individual rule for a community.
 */
export default ({ rule, index }: Props) => {
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
        <li>
            <div className="divider"></div>
            <h3 className={`text-base text-gray-300 my-2 transition`}>
                <div className="flex flex-row gap-2 text-sm -mb-4 justify-between">
                    <div className="flex flex-row gap-2">
                        <p className="">#{index + 1}.</p>
                        <p>{rule.title}</p>
                    </div>

                    {caret}
                </div>

                {extended && <p className="text-sm p-2">{rule.body}</p>}
            </h3>
        </li>
    )
}

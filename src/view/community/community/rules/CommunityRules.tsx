import React, { useState } from "react";
import useEditCommunity from "../useEditCommunity";
import useRuleModal from "./useRuleModal";
import CommunityRule from "./CommunityRule";
import { CommunityRequest } from "../../../../api/community/CommunityUtil";

/**
 * A communities' rule.
 */
export type Rule = {
    title: string;
    body: string;
    id: number;
};

type Props = {
    community: CommunityRequest,
    type?: string
}

/**
 * The communities rules. This appears on the far right sidebar.
 */
export default ({ community, type }: Props) => {
    let rules = community.community.rules

    let [showing, setShowing] = useState(5);
    let [toggle, modal] = useRuleModal(community.community.id);

    // todo i don't know man....
    let [update, setUpdate] = useState(0)

    const editing = useEditCommunity(community.community.id);

    /**
     * The "show more" button. This shows 5 (or til it reaches the max) more
     */
    const showMore = () => {
        setShowing((prev) => prev + 5);
    };

    return (
        <div
            className="accent p-4 rounded invisible lg:visible"
            style={{
                maxWidth: "200px",
            }}
        >
            {modal}

            <h2 className="text-lg text-gray-400">Community Rules</h2>

            <ol>
                {rules.length !== 0 &&
                    rules
                        .slice(0, showing)
                        .map(({ body, title, id }, index: number) => {
                            return (
                                <CommunityRule
                                    rule={{ title, body, id }}
                                    community={community.community.id}
                                    index={index}
                                    update={() => setUpdate((prev) => prev + 1)}
                                />
                            );
                        })}

                {rules.length === 0 && (
                    <p>
                        There are no rules in this community.
                    </p>
                )}
            </ol>

            <div className="flex flex-row justify-between">
                {rules.length > showing && (
                    <span
                        className="cursor-pointer text-gray-600 hover:text-gray-500"
                        onClick={showMore}
                    >
                        Show { rules.length - showing >= 5 ? 5 : rules.length - showing } more
                    </span>
                )}

                {editing && 30 > rules.length && (
                    <span
                        className="cursor-pointer text-gray-600 hover:text-gray-500"
                        onClick={toggle}
                    >
                        Create new
                    </span>
                )}
            </div>
        </div>
    );
};
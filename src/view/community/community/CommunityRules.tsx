import React, { useState } from "react";
import {
    CaretRightOutlined,
    CaretDownOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { API } from "../../../api/ApiHandler";
import { message, Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import useEditCommunity from "./useEditCommunity";

type Rule = {
    title: string;
    body: string;
    id: number;
};

type RuleProps = {
    rule: Rule;
    community: number;
    index: number;
};

const CommunityRule = ({ rule, community, index }: RuleProps) => {
    let bodyRef = React.createRef<TextArea>()
    let titleRef = React.createRef<Input>()

    const editing = useEditCommunity(community)

    const { id } = rule;

    const [title, setTitle] = useState(rule.title)
    const [body, setBody] = useState(rule.body)

    const [extended, setExtended] = useState(false);
    const [manage, setManage] = useState(false);
    const [loading, setLoading] = useState(false)

    const extend = () => setExtended((prev) => !prev);

    // Saves the changes to the post. This includes altering the title and body of the post.
    const save = async () => {
        setLoading(true)

        let bodyValue = bodyRef.current!!.state.value
        let titleValue = titleRef.current!!.state.value;

        if (body !== bodyValue) {
            let form = new FormData()

            form.append("id", `${id}`);
            form.append("body", `${bodyValue}`);

            let request = await API.patch(`/community/${community}/rules/body`, form)

            if (request.status !== 200) {
                message.error(request.data.payload)
            } else {
                setBody(bodyValue)
            }
        }

        if (title !== titleValue) {
            let form = new FormData();

            form.append("id", `${id}`);
            form.append("title", `${titleValue}`);

            let request = await API.patch(
                `/community/${community}/rules/title`,
                form
            );

            if (request.status !== 200) {
                message.error(request.data.payload);
            } else {
                setTitle(titleValue)
            }
        }

        setLoading(false)
        setManage(false)
    }

    const deleteRule = async () => {
        let request = await API.delete(`/community/${community}/rules/${id}`);

        if (request.status !== 200) {
            message.error(request.data.payload);
        } else {
            message.success("Rule has been successfully deleted.")
        }

        setExtended(false)
    }

    let caret = extended ? (
        <CaretDownOutlined className="mt-2" onClick={extend} />
    ) : (
        <CaretRightOutlined className="mt-1" onClick={extend} />
    );

    return (
        <li>
            <div className="divider"></div>

            <h3 className="text-base text-gray-300 my-2 transition">
                <div className="flex flex-row gap-2 text-sm -mb-4">
                    <p className="">#{index + 1}.</p>

                    {manage && <Input ref={titleRef} defaultValue={title} />}
                    {!manage && <p className="text-gray-400">{title}</p>}

                    {caret}
                </div>

                {extended && (
                    <>
                        {!manage && (
                            <p className="text-sm text-gray-400 p-2">{body}</p>
                        )}

                        {manage && (
                            <div className="mt-5">
                                <Input.TextArea
                                    ref={bodyRef}
                                    className="px-2"
                                    defaultValue={body}
                                />
                            </div>
                        )}

                        {editing && (
                            <div
                                className={`flex flex-row justify-evenly ${
                                    manage ? "mt-2" : ""
                                }`}
                            >
                                <Button danger ghost onClick={deleteRule}>
                                    <DeleteOutlined />
                                </Button>

                                <Button
                                    danger
                                    ghost
                                    onClick={() => setManage((prev) => !prev)}
                                >
                                    <EditOutlined />
                                </Button>

                                {manage && (
                                    <Button
                                        type="primary"
                                        ghost
                                        loading={loading}
                                        onClick={save}
                                    >
                                        <SaveOutlined />
                                    </Button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </h3>
        </li>
    );
};

type Props = {
    rules: Rule[];
    community: number;
    type?: string;
};

/**
 * The communities rules. This appears on the far right sidebar.
 */
export default ({ rules, community, type }: Props) => {
    let [showing, setShowing] = useState(5)

    const showMore = () => {
        setShowing((prev) => prev + 5)
    }

    return (
        <div
            className="accent p-4 rounded invisible lg:visible"
            style={{
                maxWidth: "200px",
            }}
        >
            <h2 className="text-lg text-gray-400">Community Rules</h2>

            <ol>
                {rules.length !== 0 &&
                    rules
                        .slice(0, showing)
                        .map(({ body, title, id }, index: number) => {
                            return (
                                <CommunityRule
                                    rule={{ title, body, id }}
                                    community={community}
                                    index={index}
                                />
                            );
                        })}

                {rules.length === 0 && (
                    <p>
                        There are no rules in this community, however you must
                        still follow our <Link to="/tos">Terms of Service</Link>
                        .
                    </p>
                )}
            </ol>

            {rules.length > showing && (
                <span
                    className="text-gray-600 cursor-pointer"
                    onClick={showMore}
                >
                    Show more
                </span>
            )}
        </div>
    );
};

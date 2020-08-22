import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useEditCommunity from "../useEditCommunity";
import { Input, message, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Rule } from "./CommunityRules";
import { removeRule } from "../../../../redux/actions/community.actions";
import { API } from "../../../../api/ApiHandler";
import {
    CaretDownOutlined,
    CaretRightOutlined,
    SaveOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

type Props = {
    rule: Rule;
    community: number;
    index: number;
    update: () => void;
};

/**
 * An individual rule for a community.
 */
export default ({ rule, community, index, update }: Props) => {
    let dispatch = useDispatch();

    let bodyRef = React.createRef<TextArea>();
    let titleRef = React.createRef<Input>();

    const editing = useEditCommunity(community);

    const { id } = rule;

    const [title, setTitle] = useState(rule.title);
    const [body, setBody] = useState(rule.body);

    const [extended, setExtended] = useState(false);
    const [manage, setManage] = useState(false);
    const [loading, setLoading] = useState(false);

    /**
     * Extend the rule.
     */
    const extend = () => setExtended((prev) => !prev);

    /**
     * Save the changes to the rule.
     */
    const save = async () => {
        setLoading(true);

        let bodyValue = bodyRef.current!!.state.value;
        let titleValue = titleRef.current!!.state.value;

        if (body !== bodyValue) {
            let form = new FormData();

            form.append("id", `${id}`);
            form.append("body", `${bodyValue}`);

            let request = await API.patch(
                `/community/${community}/rules/body`,
                form
            );

            if (request.status !== 200) {
                message.error(request.data.payload);
            } else {
                setBody(bodyValue);
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
                setTitle(titleValue);
            }
        }

        setLoading(false);
        setManage(false);
    };

    /**
     * Delete a rule.
     */
    const deleteRule = async () => {
        let request = await API.delete(`/community/${community}/rules/${id}`);

        if (request.status !== 200) {
            message.error(request.data.payload);
        } else {
            dispatch(removeRule(community, id));
            message.success("Rule has been successfully deleted.");
        }

        update();
        setExtended(false);
    };

    /**
     * The thing that extends the rule when clicking on it.
     */
    let caret = extended ? (
        <CaretDownOutlined className="mt-2" onClick={extend} />
    ) : (
        <CaretRightOutlined className="mt-1" onClick={extend} />
    );

    return (
        <li>
            <div className="divider"></div>

            <h3
                className={`text-base text-gray-300 my-2 transition`}
            >
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

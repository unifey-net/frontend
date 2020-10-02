import React, { useEffect, useState } from "react";
import CommunityRole from "./CommunityRole";
import {
    LOADING,
    RequestStatus,
    API,
    ERROR,
    COMPLETE,
} from "../../../../../api/ApiHandler";
import { UserRole } from "../../../../../api/community/Roles";
import { CommunityRequest } from "../../../../../api/community/CommunityUtil";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import useSetRoleModal from "./setRole/useSetRoleModal";

type Props = {
    community: CommunityRequest;
};

export default ({ community }: Props) => {
    const [roles, setRoles] = useState([] as UserRole[]);
    const [status, setStatus] = useState({
        message: "",
        status: LOADING,
    } as RequestStatus);

    const [modal, toggle] = useSetRoleModal(community)

    useEffect(() => {
        const loadReports = async () => {
            let request = await API.get(
                `/community/${community.community.id}/roles`
            );

            if (request.status !== 200) {
                setStatus({ message: request.data.payload, status: ERROR });
            } else {
                setStatus({ message: "", status: COMPLETE });

                const keys = Object.keys(request.data);

                setRoles(
                    keys.map(
                        (id: string, index: number) =>
                            ({ role: +request.data[id], user: +id } as UserRole)
                    )
                );
            }
        };

        loadReports();
    }, []);

    return (
        <>
            <h1 className="text-2xl">Roles</h1>

            <ul className="flex flex-col gap-8">
                {roles.map((role: UserRole, index: number) => (
                    <CommunityRole
                        index={index}
                        role={role.role}
                        user={role.user}
                        selfRole={community.selfRole}
                    ></CommunityRole>
                ))}
            </ul>

            { modal }

            <div className="flex justify-evenly">
                <Button onClick={toggle}><PlusCircleOutlined/></Button>
            </div>
        </>
    );
};

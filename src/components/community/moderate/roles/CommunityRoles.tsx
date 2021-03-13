import React, { useEffect, useState } from "react"
import CommunityRole from "./CommunityRole"
import { UserRole } from "../../../../api/community/Roles"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import { Alert, Button, Spin } from "antd"
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons"
import useSetRoleModal from "./setRole/useSetRoleModal"
import Status, { COMPLETE, LOADING, ERROR } from "../../../../api/util/Status"
import { getRoles } from "../../../../api/community/Community"

type Props = {
    community: CommunityRequest
}

/**
 * A communities roles.
 */
const CommunityRoles: React.FC<Props> = ({ community }) => {
    const [roles, setRoles] = useState([] as UserRole[])
    const [{ status, message }, setStatus] = useState({
        message: "",
        status: LOADING,
    } as Status)

    const [modal, toggle] = useSetRoleModal(community)

    useEffect(() => {
        const loadRoles = async () => {
            let request = await getRoles(community.community.id)

            if (request.status !== 200) {
                setStatus({ message: request.data.payload, status: ERROR })
            } else {
                setStatus({ message: "", status: COMPLETE })

                setRoles(request.data as UserRole[])
            }
        }

        loadRoles()
    }, [community.community.id])

    return (
        <>
            <h1 className="text-2xl">Roles</h1>

            <ul className="flex flex-col gap-4">
                {status === COMPLETE &&
                    roles
                        .sort((a: UserRole, b: UserRole) => b.role - a.role)
                        .map((role: UserRole, index: number) => (
                            <CommunityRole
                                index={index}
                                userRole={role}
                                selfRole={community.selfRole}
                                community={community.community.id}
                            />
                        ))}

                {status === LOADING && <Spin indicator={<LoadingOutlined />} />}

                {status === ERROR && (
                    <Alert message={message} showIcon type="error" />
                )}
            </ul>

            {modal}

            <div className="flex justify-evenly">
                <Button onClick={toggle}>
                    <PlusCircleOutlined />
                </Button>
            </div>
        </>
    )
}

export default CommunityRoles

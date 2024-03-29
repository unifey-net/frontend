import React, { useEffect, useState } from "react"
import CommunityRole from "./CommunityRole"
import { UserRole } from "../../../../api/community/Roles"
import { CommunityRequest } from "../../../../api/community/CommunityUtil"
import { Alert, Button, Spin } from "antd"
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons"
import useSetRoleModal from "./setRole/useSetRoleModal"
import Status, { COMPLETE, LOADING, ERROR } from "../../../../api/util/Status"
import { getRoles } from "../../../../api/community/Community"
import ModeratePage from "../ModeratePage"
import styled from "styled-components"

type Props = {
    community: CommunityRequest
}

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-bottom: 16px;
`

/**
 * A communities roles.
 */
const CommunityRoles: React.FC<Props> = ({ community }) => {
    const [roles, setRoles] = useState([] as UserRole[])
    const [{ status, message }, setStatus] = useState({
        message: "",
        status: LOADING,
    } as Status)

    const [modal, toggle, newRole] = useSetRoleModal(community)

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

    if (status === ERROR) {
        return (
            <ModeratePage>
                <Alert
                    message="There was an issue loading roles in this community."
                    description={message}
                    showIcon
                    type="error"
                />
            </ModeratePage>
        )
    }

    if (status === LOADING) {
        return (
            <ModeratePage>
                <Spin indicator={<LoadingOutlined />} />
            </ModeratePage>
        )
    }

    return (
        <ModeratePage>
            <ButtonContainer>
                <Button onClick={toggle}>
                    <PlusCircleOutlined />
                </Button>
            </ButtonContainer>

            {modal}

            <ul>
                {(newRole.id === -1 ? roles : [...roles, newRole])
                    .sort((a: UserRole, b: UserRole) => b.role - a.role)
                    .map((role: UserRole, index: number) => (
                        <CommunityRole
                            index={index}
                            userRole={role}
                            selfRole={community.selfRole}
                            community={community.community.id}
                        />
                    ))}
            </ul>
        </ModeratePage>
    )
}

export default CommunityRoles

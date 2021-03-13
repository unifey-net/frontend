import React, { useState } from "react"
import UserView from "../../../view/UserView"
import { Dropdown, Menu } from "antd"
import { getRoleName, UserRole } from "../../../../api/community/Roles"
import toast from "react-hot-toast"
import ToastTheme from "../../../../api/ToastTheme"
import { updateUserRole } from "../../../../api/community/Community"

type Props = {
    index: number
    userRole: UserRole
    selfRole: number
    community: number
}

/**
 * A community role.
 */
const CommunityRole: React.FC<Props> = ({ index, userRole, selfRole, community }) => {
    const { name, id } = userRole

    const [role, setRole] = useState(userRole.role)

    const updateRole = async (role: number) => {
        const request = await updateUserRole(community, id, role)

        if (request.status === 200) {
            setRole(role)
            toast.success("Successfully update roles!", ToastTheme)
        } else {
            toast.error(request.data.payload, ToastTheme)
        }
    }

    let modify = (
        <Menu>
            <Menu.Item disabled>
                {role === 4 && <strong>Owner</strong>}
                {role !== 4 && <>Owner</>}
            </Menu.Item>

            <Menu.Item
                disabled={4 > selfRole || role === 4}
                onClick={() => updateRole(3)}
            >
                {role === 3 && <strong>Administrator</strong>}
                {role !== 3 && <>Administrator</>}
            </Menu.Item>

            <Menu.Item
                disabled={3 > selfRole || role === 4}
                onClick={() => updateRole(2)}
            >
                {role === 2 && <strong>Moderator</strong>}
                {role !== 2 && <>Moderator</>}
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
                disabled={role >= selfRole}
                onClick={() => updateRole(1)}
            >
                Remove
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="accent rounded flex flex-row justify-between p-4 border-black">
            <UserView username={name} showUsername={true} />

            <Dropdown overlay={modify} disabled={role > selfRole}>
                <p className="cursor-pointer pt-2">{getRoleName(role)}</p>
            </Dropdown>
        </div>
    )
}

export default CommunityRole
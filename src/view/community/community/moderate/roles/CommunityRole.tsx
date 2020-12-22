import React from "react"
import UserView from "../../../../../components/view/UserView"
import { Dropdown, Menu } from "antd"
import { getRoleName } from "../../../../../api/community/Roles"

type Props = {
    index: number
    role: number
    user: number
    selfRole: number
}

export default ({ index, user, role, selfRole }: Props) => {
    let modify = (
        <Menu>
            <Menu.Item disabled>
                {role === 4 && <strong>Owner</strong>}
                {role !== 4 && <>Owner</>}
            </Menu.Item>

            <Menu.Item disabled={role === 4}>
                {role === 3 && <strong>Administrator</strong>}
                {role !== 3 && <>Administrator</>}
            </Menu.Item>

            <Menu.Item disabled={role === 4}>
                {role === 2 && <strong>Moderator</strong>}
                {role !== 2 && <>Moderator</>}
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item disabled={role === 4}>Remove</Menu.Item>
        </Menu>
    )

    return (
        <div className="accent rounded flex flex-row justify-between p-4 border-black">
            <UserView username="notdebug" showUsername={true} />
            <Dropdown overlay={modify} disabled={role > selfRole}>
                <p className="cursor-pointer pt-2">{getRoleName(role)}</p>
            </Dropdown>
        </div>
    )
}

import React from "react"
import { Divider } from "antd"
import { Link } from "react-router-dom"

type Props = {
    staff: string[]
}

/**
 * A communities staff members. This appears as a section of the far right sidebar.
 */
export default ({ staff }: Props) => {
    return (
        <div
            className="accent p-4"
            style={{
                maxWidth: "200px",
            }}
        >
            <h2 className="text-lg">Community Staff</h2>

            <ul>
                {staff.length > 0 &&
                    staff.slice(0, 5).map((member, index) => {
                        return (
                            <li key={index}>
                                - {<Link to={`/u/${member}`}>{member}</Link>}
                            </li>
                        );
                    })}

                {staff.length === 0 && (
                    <p>
                        There are no staff in this community. Honestly, I don't
                        know how this happened.
                    </p>
                )}
            </ul>
        </div>
    );
}
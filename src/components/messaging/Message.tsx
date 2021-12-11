import React from "react"

const Message: React.FC<{ message: string, user: string }> = ({ message, user }) => {
    return <div>
        {user} - {message} 
    </div>
}

export default Message
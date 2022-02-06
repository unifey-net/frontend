import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import { MdClose } from "react-icons/md"
import { useState } from "react"
import { useNotificationActions } from "../../api/notification/NotificationsSocket"
import { deleteAllNotifications, deleteNotification, setReadStatus } from "../../api/notification/Notifications"

const notificationToastTheme = {
    className: "toast-notification",
    // icon: <MdNotifications/>
}

const useNotificationPopUp = () => {
    const dispatch = useDispatch()
    const { deleteNotification: socketDeleteNotification, readNotification } = useNotificationActions()

    const notifications = useSelector((store: any) => store.notifications.notifications)
    const [oldSize, setOldSize] = useState(notifications.length)

    const closeNotification = (toastId: string, notifId: number) => {
        toast.dismiss(toastId)
        socketDeleteNotification(notifId)
        dispatch(deleteNotification({ id: notifId }))
    }

    if (notifications.length > oldSize) {
        setOldSize(notifications.length)
        const notif = notifications[notifications.length - 1]

        console.debug(`Found Notif: ${notif.id}, Read: ${notif.read}`)

        if (!notif.read) {
            readNotification(notif.id)
            dispatch(setReadStatus({ id: notif.id, read: true }))

            const toastId = toast(
                <div>
                    <div className="toast-name-column">
                        <p>{notif.message}</p>
                        <span>{new Date(notif.date).toLocaleString()}</span>
                    </div>

                    <button
                        onClick={() => closeNotification(toastId, notif.id)}
                    >
                        <MdClose />
                    </button>
                </div>,
                notificationToastTheme
            )
        }
    }
}

export default useNotificationPopUp

import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { MdClose } from "react-icons/md"
import { useNotificationSocket } from "../../api/notification/NotificationsSocket"
import { useState } from "react"
import { notifDelete } from "../../redux/actions/notifications.actions"

const notificationToastTheme = {
    className: "toast-notification",
    // icon: <MdNotifications/>
}

const useNotificationPopUp = () => {
    const dispatch = useDispatch()
    const { deleteNotification } = useNotificationSocket()
    const notifications = useSelector((store: any) => store.notifications.notifications)
    const [oldSize, setOldSize] = useState(notifications.length)

    const closeNotification = (toastId: string, notifId: number) => {
        toast.dismiss(toastId)
        deleteNotification(notifId)
        dispatch(notifDelete(notifId))
    }
    
    if (notifications.length > oldSize && !(notifications.length - oldSize > 1 && oldSize === 0)) {
        setOldSize(notifications.length)
        const notif = notifications[notifications.length - 1]
    
        const toastId = toast(
            <div>
                <div className="toast-name-column">
                    <p>{notif.message}</p>
                    <span>{new Date(notif.date).toLocaleString()}</span>
                </div>

                <button onClick={() => closeNotification(toastId, notif.id)}>
                    <MdClose />
                </button>
            </div>,
            notificationToastTheme
        )
    }
}

export default useNotificationPopUp
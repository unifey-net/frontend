import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import ToastTheme from "../api/ToastTheme"
import React from "react"
import { MdClose } from "react-icons/md"
import { API } from "../api/ApiHandler"
import { useNotificationSocket } from "../api/notification/NotificationsSocket"

const notificationToastTheme = {
    style: {
        ...ToastTheme.style
    },
    className: "toast-notification",
    // icon: <MdNotifications/>
}

const useNotificationPopUp = () => {
    const [deleteNotification] = useNotificationSocket()
    const notifications = useSelector((store: any) => store.notifications.notifications)
    let oldSize = 0 // TODO: 

    const closeNotification = (toastId: string, notifId: number) => {
        toast.dismiss(toastId)
        deleteNotification(notifId)
    }

    if (notifications.length > oldSize) {
        oldSize = notifications.length
        const notif = notifications[notifications.length - 1]

        console.log("Popup: %o", notif)
    
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
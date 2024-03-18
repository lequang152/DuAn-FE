import { ToastPosition, toast } from "react-toastify"

export function makeSuccessToast(message: string, position?: ToastPosition) {
    toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "z-50",
    })
}
export function makeWarningToast(message: string, position?: ToastPosition) {
    toast.warning(message, {
        position: position || "top-right",
        autoClose: 500,

        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "z-50",
    })
}

export function makeErrorToast(message: string, position?: ToastPosition) {
    toast.error(message, {
        position: position || "top-right",
        autoClose: 1000,

        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "z-50",
    })
}

import { ReactNode } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm"
                onClick={onClose} 
            ></div>

            <section
                id="modal"
                className="w-[40vw] h-[50vh] relative p-8 bg-white rounded-lg shadow-lg border flex flex-col items-center justify-center"
            >
                {/**Not be keeping the button to close since importing is a irreversible thing. But still, keeping it for reference */}
                {/* <button
                    className="absolute top-3 text-2xl right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button> */}
                {children}
            </section>
        </div>
    )
}

export default Modal

"use client"
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'

type Props = {
    title: string,
    onClose: () => void,
    onOk: () => void,
    children: React.ReactNode,
}

export default function Dialog({ title, onOk, children }: Props) {

    const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showDialog = searchParams.get('showDialog')

    useEffect(() => {
        if (showDialog === 'y') {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    const closeDialog = () => {
        dialogRef.current?.close()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onOk()
        closeDialog()
    }

    const dialog: JSX.Element | null = showDialog === 'y'
        ? (
            <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50">
                <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
                    <div className="flex flex-row justify-between mb-4 p-2 px-5 bg-blue-500">
                        <h1 className="text-xl text-white font-bold my-auto">{title}</h1>
                        <button
                            onClick={closeDialog}
                            className="my-auto py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                        >
                            x
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="px-5 pb-6">
                            {children}
                            <div className="flex flex-row justify-end mt-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 py-2 px-3 rounded border-none font-bold text-white"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>
        ) : null

    return dialog
}

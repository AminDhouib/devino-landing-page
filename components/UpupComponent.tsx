'use client'

import allowedFileTypes from '~/data/allowedFileTypes.json'
import { useContext, useEffect, useRef } from 'react'
import {
    FileWithParams,
    UploadAdapter,
    UpupProvider,
    UpupUploader,
    UpupUploaderRef,
} from 'upup-react-file-uploader'
import 'upup-react-file-uploader/styles'
import { useTheme } from '~/app/lib/context/ThemeContext'

import Link from 'next/link'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FiX } from 'react-icons/fi'

type Props = {
    isPopup?: boolean
    isDocument: boolean
    isProcessing: boolean
    finalFiles?: File[]
    rejectedFiles?: FileWithParams[]
    onFileClick?: (file: File) => void
    onFileRemove: (file: FileWithParams) => void
    doneUploading: (file: FileWithParams[]) => void
    setFiles: (file: FileWithParams[]) => void
    closePopup?: () => void
}

export default function UpupComponent({
    isPopup,
    isDocument,
    isProcessing,
    finalFiles,
    rejectedFiles,
    setFiles,
    onFileClick,
    doneUploading,
    onFileRemove,
    closePopup,
}: Props) {
    const ref = useRef<UpupUploaderRef | null>(null)
    const { theme } = useTheme()
    const isDarkMode = theme === 'dark'
    let allowedFileTypesString = 'image/*'
    if (isDocument) {
        const mimeData = [
            ...allowedFileTypes.documents.mimeTypes,
            ...allowedFileTypes.resume.mimeTypes,
        ]
        allowedFileTypesString = mimeData.join()
    }
    useEffect(() => {
        if (!ref.current) return
        const files = ref.current.useUpload().files
        const newFiles = files.filter(
            file =>
                !rejectedFiles?.some(
                    rejectedFile => rejectedFile.id === file.id,
                ),
        )
        ref.current.useUpload().dynamicallyReplaceFiles(newFiles)
    }, [rejectedFiles])

    useEffect(() => {
        if (!ref.current || !finalFiles?.length) return
        ref.current
            .useUpload()
            .dynamicUpload(finalFiles || [])
            .then(res => {
                if (!res) {
                    console.error('Error uploading files')
                    return
                }
                ref?.current?.useUpload().dynamicallyReplaceFiles([])
                doneUploading(res)
            })
    }, [finalFiles])

    const cancelUpload = () => {
        if (ref.current) {
            ref.current.useUpload().dynamicallyReplaceFiles([])
        }
        closePopup && closePopup()
    }
    const upupUploader = (
        <UpupUploader
            provider={UpupProvider.BackBlaze}
            limit={50}
            ref={ref}
            allowPreview={false}
            isProcessing={isProcessing}
            maxFileSize={{
                unit: 'MB',
                size: 50,
            }}
            uploadAdapters={[
                UploadAdapter.INTERNAL,
                UploadAdapter.CAMERA,
                UploadAdapter.LINK,
                UploadAdapter.GOOGLE_DRIVE,
                UploadAdapter.ONE_DRIVE,
            ]}
            classNames={{
                uploadButton: 'hidden',
            }}
            driveConfigs={{
                googleDrive: {
                    google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_PICKER!,
                    google_api_key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
                    google_app_id: process.env.NEXT_PUBLIC_GOOGLE_APP_ID!,
                },
                oneDrive: {
                    onedrive_client_id:
                        process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID!,
                },
            }}
            tokenEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/backblaze/getPresignedUrl`}
            dark={isDarkMode}
            enableAutoCorsConfig={false}
            onFileClick={onFileClick}
            onFileRemove={onFileRemove}
            onFilesSelected={setFiles}
            onError={error => {
                console.error('Upload error:', error)
            }}
            customProps={{
                isDocument,
                useSeparateThumbnailBucket: true,
            }}
            accept={allowedFileTypesString}
        />
    )
    if (!isPopup) {
        return (
            <div className="flex h-full w-full  flex-col items-center justify-center">
                {upupUploader}
                <div className="mx-auto mb-4 mt-10 flex w-fit items-center gap-2 rounded bg-blue-100 p-3 text-blue-800 dark:bg-[#242526] dark:text-gray-400 md:mb-0 md:text-xs">
                    <AiFillInfoCircle className="text-xl" />
                    <div>
                        Your documents will be shared on uNotes, enriched, and
                        used to extract content to assist in studying. View{' '}
                        <Link
                            className="text-primary underline underline-offset-2"
                            target="_blank"
                            href="/privacy"
                        >
                            Terms of Services
                        </Link>{' '}
                        for more.
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div
            onClick={cancelUpload}
            className="fixed inset-0 z-[99] flex items-center justify-center bg-black/60 p-4"
        >
            <div
                className="relative flex min-w-[89vh] justify-center md:min-w-0"
                onClick={e => {
                    e.stopPropagation()
                }}
            >
                {upupUploader}
                <div className="z-[999999] -ml-6 -mt-4 md:-ml-4 md:-mt-2">
                    <button
                        onClick={cancelUpload}
                        className="inline-flex items-center justify-center rounded-xl bg-red-600 p-2 text-white hover:bg-red-700 dark:bg-red-400 dark:text-black dark:hover:bg-red-500 md:p-1"
                        aria-label="Close"
                    >
                        <FiX className="h-5 w-5 md:h-4 md:w-4 " />
                    </button>
                </div>
            </div>
        </div>
    )
}

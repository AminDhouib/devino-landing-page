// components/application/FileUpload.tsx
import { MdUpload, MdClose, MdDescription } from "react-icons/md";
import { FormQuestion } from "~/types/application";

interface FileUploadProps {
    question: FormQuestion;
    uploadedFile?: File;
    onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFileRemove: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    error: boolean;
}

export default function FileUpload({
                                       question,
                                       uploadedFile,
                                       onFileSelect,
                                       onFileRemove,
                                       fileInputRef,
                                       error
                                   }: FileUploadProps) {
    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                onChange={onFileSelect}
                accept={question.validation?.fileTypes?.join(',')}
                className="hidden"
            />

            {uploadedFile ? (
                <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-lightblueactive/10 rounded-lg flex items-center justify-center">
                            <MdDescription className="w-5 h-5 text-lightblueactive" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {uploadedFile.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onFileRemove}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                        <MdClose className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full p-6 border-2 border-dashed rounded-lg text-center transition-all duration-200 hover:border-lightblueactive hover:bg-lightblueactive/5 ${
                        error
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600'
                    }`}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                            error
                                ? 'bg-red-100 dark:bg-red-900/20'
                                : 'bg-lightblueactive/10'
                        }`}>
                            <MdUpload className={`w-6 h-6 ${
                                error ? 'text-red-500' : 'text-lightblueactive'
                            }`} />
                        </div>
                        <div>
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                                Click to upload {question.label.toLowerCase()}
                            </p>
                            {question.validation?.fileTypes && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Accepted: {question.validation.fileTypes.join(', ')}
                                </p>
                            )}
                            {question.validation?.maxFileSize && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Max size: {question.validation.maxFileSize}MB
                                </p>
                            )}
                        </div>
                    </div>
                </button>
            )}
        </div>
    );
}
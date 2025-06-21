// components/application/CheckboxOption.tsx
import { MdCheck } from "react-icons/md";

interface CheckboxOptionProps {
    option: string;
    selected: boolean;
    onChange: (checked: boolean) => void;
}

export default function CheckboxOption({ option, selected, onChange }: CheckboxOptionProps) {
    return (
        <button
            type="button"
            onClick={() => onChange(!selected)}
            className={`w-full rounded-lg border px-4 py-3 text-left transition-all duration-200 hover:shadow-sm ${
                selected
                    ? 'border-lightblueactive bg-lightblueactive/10 shadow-sm'
                    : 'border-gray-300 dark:border-gray-600 hover:border-lightblueactive/50'
            }`}
        >
            <div className="flex items-start gap-3">
                <span
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 border rounded transition-all duration-200 flex items-center justify-center ${
                        selected
                            ? 'border-lightblueactive bg-lightblueactive'
                            : 'border-gray-300 dark:border-gray-500'
                    }`}
                >
                    {selected && (
                        <MdCheck className="w-3 h-3 text-white" />
                    )}
                </span>
                <span className={`text-sm transition-colors duration-200 ${
                    selected
                        ? 'text-lightblueactive font-medium dark:text-lightblueactive'
                        : 'text-gray-700 dark:text-gray-300'
                }`}>
                    {option}
                </span>
            </div>
        </button>
    );
}
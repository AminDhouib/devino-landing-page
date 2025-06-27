// components/application/RadioOption.tsx
interface RadioOptionProps {
    option: string;
    selected: boolean;
    questionId: string;
    onChange: () => void;
}

export default function RadioOption({ option, selected, questionId, onChange }: RadioOptionProps) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`w-full rounded-lg border px-4 py-3 text-left transition-all duration-200 hover:shadow-sm ${
                selected
                    ? 'border-lightblueactive bg-lightblueactive/10 shadow-sm'
                    : 'border-gray-300 dark:border-gray-600 hover:border-lightblueactive/50'
            }`}
        >
            <div className="flex items-start gap-3">
                <span
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 border rounded-full transition-all duration-200 ${
                        selected
                            ? 'border-lightblueactive bg-lightblueactive'
                            : 'border-gray-300 dark:border-gray-500'
                    }`}
                >
                    {selected && (
                        <span className="block w-full h-full rounded-full bg-white scale-50 transform transition-transform duration-200" />
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
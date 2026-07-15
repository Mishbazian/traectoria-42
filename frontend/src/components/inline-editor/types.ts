export interface InlineEditorProps {
	value: string;
	onSubmit: (value: string) => void;
	onCancel: () => void;
	placeholder?: string;
}

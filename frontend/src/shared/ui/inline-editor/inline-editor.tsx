// frontend/src/components/inline-editor/inline-editor.tsx
import { useState, useEffect, useRef } from 'react';
import type { InlineEditorProps } from './types';
import { Button } from '../button';
import { InputGroup, InputGroupButton, InputGroupInput } from '../input-group';
import { CircleCheck, CircleX, RotateCcw } from 'lucide-react';

export const InlineEditor = ({
	value,
	onSubmit,
	onCancel,
	placeholder = 'Введите текст',
	closeOnOutsideClick = false,
}: InlineEditorProps) => {
	const [draft, setDraft] = useState(value);
	const inputRef = useRef<HTMLInputElement>(null);
	const editorRef = useRef<HTMLFormElement>(null);

	// Автофокус при монтировании
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	// Выход по Escape
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onCancel();
		}
	};

	// Закрытие при клике вне компонента
	useEffect(() => {
		if (!closeOnOutsideClick) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				editorRef.current &&
				!editorRef.current.contains(event.target as Node)
			) {
				onCancel();
			}
		};

		if (inputRef.current) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [closeOnOutsideClick, onCancel]);

	// Отправка — только если есть текст
	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		if (draft.trim()) {
			onSubmit(draft.trim());
		}
	};

	// Определяем, изменился ли текст (с учётом пробелов)
	const isChanged = draft.trim() !== value.trim();

	return (
		<form
			ref={editorRef}
			className='animate-in fade-in zoom-in-95 flex w-full min-w-0 items-center gap-2 duration-200'
			onSubmit={handleSubmit}
			onKeyDown={handleKeyDown}
			aria-label={`Редактор: ${value}`}>
			<InputGroup className='min-w-0 flex-1 rounded-md border shadow-sm transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200'>
				<InputGroupInput
					id='inline-editor'
					name='inline-editor'
					ref={inputRef}
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
					placeholder={placeholder}
					required
					aria-invalid={!draft.trim()}
					aria-describedby={isChanged ? 'draft-changed' : undefined}
				/>
				<InputGroupButton
					variant='ghost'
					size='icon-sm'
					type='button'
					onClick={() => setDraft(value)}
					title='Отменить изменения'
					disabled={!isChanged}>
					<RotateCcw
						className={isChanged ? 'text-amber-600' : 'text-muted-foreground'}
					/>
				</InputGroupButton>
			</InputGroup>

			<div
				className='flex items-center gap-1'
				role='group'
				aria-label='Действия редактора'>
				<Button
					type='submit'
					variant='outline'
					size='icon'
					className='rounded-md text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 focus:ring-emerald-200 disabled:opacity-50'
					title='Сохранить'
					disabled={!draft.trim()}>
					<CircleCheck className='h-4 w-4' />
				</Button>

				<Button
					type='button'
					variant='ghost'
					size='icon'
					onClick={onCancel}
					title='Отмена'
					className='rounded-md text-rose-500 hover:bg-rose-50'>
					<CircleX className='h-4 w-4' />
				</Button>
			</div>
		</form>
	);
};

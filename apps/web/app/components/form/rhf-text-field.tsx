import { cn } from '@/lib/utils';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { LucideIcon } from 'lucide-react';
import {
	FieldError,
	FieldPath,
	FieldValues,
	UseControllerProps,
	useController,
} from 'react-hook-form';

type Props<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
	label: string;
	type?: string;
	disabled?: boolean;
	error?: FieldError;
	placeholder?: string;
	StartAdornment?: LucideIcon;
	EndAdornment?: LucideIcon;
	handleClickAdornment?: () => void;
	className?: string;
	containerClassName?: string;
};

export function RhfTextField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	error,
	name,
	label,
	control,
	type = 'text',
	placeholder,
	defaultValue,
	disabled,
	EndAdornment,
	StartAdornment,
	className,
	handleClickAdornment,
	containerClassName,
	...rest
}: Props<TFieldValues, TName>) {
	const {
		field: { onChange, value, ref, ...props },
	} = useController({ control, name, defaultValue });

	return (
		<div className={containerClassName}>
			<Label className="text-zinc-100" htmlFor={name}>
				{label}
			</Label>
			<div className="relative">
				{StartAdornment && (
					<span className="absolute inset-y-0 left-0 flex items-center pl-2">
						{
							<StartAdornment
								onClick={handleClickAdornment}
								className="text-zinc-600 cursor-pointer"
							/>
						}
					</span>
				)}
				<Input
					value={value}
					onChange={onChange}
					id={name}
					placeholder={placeholder}
					disabled={disabled}
					type={type}
					ref={ref}
					{...props}
					{...rest}
					className={cn(className)}
				/>
				{EndAdornment && (
					<span className="absolute inset-y-0 right-0 flex items-center pr-2">
						{
							<EndAdornment
								className="text-zinc-600 cursor-pointer"
								onClick={handleClickAdornment}
							/>
						}
					</span>
				)}
			</div>
			{error?.message && (
				<p className="text-sm text-red-500 mt-px">{error.message}</p>
			)}
		</div>
	);
}

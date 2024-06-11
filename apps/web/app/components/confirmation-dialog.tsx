import { Button } from './ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';

interface ConfirmationDialogProps {
	onConfirm: () => void;
	children: React.ReactNode;
	title: string;
	description: string;
}

export const ConfirmationDialog = ({
	onConfirm,
	children,
	title,
	description,
}: ConfirmationDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
				<DialogFooter className="gap-2 lg:gap-0">
					<DialogClose asChild>
						<Button variant="destructive">Cancelar</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button variant="default" onClick={onConfirm}>
							Confirmar
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

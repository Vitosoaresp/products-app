'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { AddProductForm } from './components/add-product-form';

export const AddProduct = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" className="w-full lg:w-auto">
					Criar novo produto
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Novo Produto</DialogHeader>
				<AddProductForm onClose={handleClose} />
			</DialogContent>
		</Dialog>
	);
};

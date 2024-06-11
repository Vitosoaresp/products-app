import { AddProduct, ProductsList, SearchBar } from './components';

export default function Products() {
	return (
		<div>
			<div className="flex justify-between w-full items-center flex-col lg:flex-row mb-4 lg:mb-0">
				<SearchBar />
				<AddProduct />
			</div>
			<div className="border border-zinc-900 rounded-lg">
				<ProductsList />
			</div>
		</div>
	);
}

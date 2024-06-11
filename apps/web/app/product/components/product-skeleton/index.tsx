import { Skeleton } from '@/components/ui/skeleton';

export const ProductSkeleton = () => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Skeleton className="w-full h-10 rounded-lg" />
				<Skeleton className="w-full h-10 rounded-lg" />
				<Skeleton className="w-full h-10 rounded-lg" />
				<Skeleton className="w-full h-10 rounded-lg" />
				<Skeleton className="w-full h-10 rounded-lg" />
				<Skeleton className="w-full h-10 rounded-lg" />
			</div>
			<div className="flex justify-end mt-4 gap-4">
				<Skeleton className="h-10 w-24 rounded-lg" />
				<Skeleton className="h-10 w-24 rounded-lg" />
			</div>
		</>
	);
};

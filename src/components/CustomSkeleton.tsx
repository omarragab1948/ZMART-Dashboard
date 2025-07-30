import { Skeleton } from "./ui/skeleton";

const CustomSkeleton = ({ length = 5 }: { length?: number }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length }, (_, i) => (
        <Skeleton className="h-8 w-full" key={i} />
      ))}
    </div>
  );
};

export default CustomSkeleton;

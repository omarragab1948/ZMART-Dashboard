import { Skeleton } from "./ui/skeleton";

const CustomSkeleton = ({ length = 5 }: { length?: number }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length }, () => (
        <Skeleton className="h-8 w-full" />
      ))}
    </div>
  );
};

export default CustomSkeleton;

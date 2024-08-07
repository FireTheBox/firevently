import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonFeaturedEvent = () => {
  return (
    <div className="col-span-3 flex w-full items-end rounded-lg bg-foreground/10 p-8">
      <Card className="w-full border-none bg-transparent shadow-none">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-10">
          <Skeleton className="h-10 w-24 rounded" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        </CardFooter>
      </Card>
      <Skeleton className="ml-8 h-full w-2/3 rounded-lg" />
    </div>
  );
};

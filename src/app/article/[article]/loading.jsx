import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function loading() {
  return (
    <section className="py-20 px-[5%]">
      <div className="container">
        <div className="relative flex flex-col justify-between gap-10 ">
          {/* Sidebar */}
          <aside className="top-10 mx-auto h-fit w-full max-w-[65ch] ">
            <div className="mb-5 flex items-center gap-1 text-muted-foreground">
              <ChevronLeft className="h-full w-4" />
              <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-600/70" />
            </div>
            <div className="mb-5">
              <Skeleton className="h-8 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
              <Skeleton className="h-8 w-4/5 bg-gray-200 dark:bg-gray-600/70 mb-2" />
              <Skeleton className="h-8 w-4/5 bg-gray-200 dark:bg-gray-600/70" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="size-7 rounded-full bg-gray-200 dark:bg-gray-600/70" />
              <div>
                <Skeleton className="h-4 w-24 mb-1 bg-gray-200 dark:bg-gray-600/70" />
                <Skeleton className="h-3 w-16 bg-gray-200 dark:bg-gray-600/70" />
              </div>
            </div>
          </aside>

          {/* Article */}
          <article className="mx-auto w-full max-w-[65ch]">
            <div>
              <Skeleton className="h-[60px] w-full mb-8 bg-gray-200 dark:bg-gray-600/70" />
              <Skeleton className="mt-0 mb-8 aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-600/70" />
            </div>
            <Skeleton className="h-8 w-3/4 mb-6 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-4/5 mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <Skeleton className="h-6 w-1/2 mb-4 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <Skeleton className="h-24 w-full mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <Skeleton className="h-6 w-1/3 mb-4 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <div className="space-y-2 mb-6">
              <Skeleton className="h-4 w-4/5 bg-gray-200 dark:bg-gray-600/70" />
              <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600/70" />
              <Skeleton className="h-4 w-4/5 bg-gray-200 dark:bg-gray-600/70" />
            </div>

            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-4/5 mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <Skeleton className="h-6 w-1/3 mb-4 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-4/5 mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <Skeleton className="h-6 w-1/3 mb-4 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <div className="mb-6">
              <Skeleton className="h-32 w-full bg-gray-200 dark:bg-gray-600/70" />
            </div>

            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-4/5 mb-6 bg-gray-200 dark:bg-gray-600/70" />

            <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-4/5 bg-gray-200 dark:bg-gray-600/70" />
          </article>
        </div>
      </div>
    </section>
  );
}

export default loading;

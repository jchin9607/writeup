import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="min-h-screen  text-[#37352f] dark:text-[#e6e6e6] font-sans">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 mb-8">
          {/* Profile Picture Skeleton */}
          <div className="relative">
            <Skeleton className="h-24 w-24 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-300/70 dark:bg-gray-600/70" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 dark:via-gray-800/20 to-transparent animate-[shimmer_2s_infinite] -z-10"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              {/* Name Skeleton */}
              <Skeleton className="h-8 w-48 bg-gray-300/70 dark:bg-gray-600/70" />
              {/* Follow Button Skeleton */}
              <Skeleton className="h-9 w-24 bg-gray-300/70 dark:bg-gray-600/70" />
            </div>
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-64 mt-2 bg-gray-300/70 dark:bg-gray-600/70" />
            {/* Follower Stats Skeleton */}
            <Skeleton className="h-4 w-40 mt-3 bg-gray-300/70 dark:bg-gray-600/70" />
          </div>
        </div>

        {/* Location and Contact Skeleton */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Skeleton className="h-5 w-32 bg-gray-300/70 dark:bg-gray-600/70" />
          <Skeleton className="h-5 w-48 bg-gray-300/70 dark:bg-gray-600/70" />
        </div>

        <Separator className="my-6 bg-gray-300 dark:bg-gray-700" />

        {/* About Section Skeleton */}
        <div className="mb-8">
          {/* Section Title Skeleton */}
          <div className="flex items-center gap-1 mb-3">
            <Skeleton className="h-5 w-5 bg-gray-300/70 dark:bg-gray-600/70" />
            <Skeleton className="h-7 w-24 bg-gray-300/70 dark:bg-gray-600/70" />
          </div>
          {/* Content Skeleton */}
          <div className="pl-6 space-y-3">
            <Skeleton className="h-4 w-full bg-gray-300/70 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-full bg-gray-300/70 dark:bg-gray-600/70" />
            <Skeleton className="h-4 w-3/4 bg-gray-300/70 dark:bg-gray-600/70" />
          </div>
        </div>

        {/* Experience Section Skeleton */}
        {/* <div className="mb-8">
        
          <div className="flex items-center gap-1 mb-3">
            <Skeleton className="h-5 w-5 bg-gray-300/70 dark:bg-gray-600/70" />
            <Skeleton className="h-7 w-32 bg-gray-300/70 dark:bg-gray-600/70" />
          </div>
   
          <div className="pl-6 space-y-6">
       
            <div className="bg-white dark:bg-[#262626] p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-5 w-48 bg-gray-300/70 dark:bg-gray-600/70" />
                  <Skeleton className="h-4 w-32 mt-2 bg-gray-300/70 dark:bg-gray-600/70" />
                </div>
                <Skeleton className="h-4 w-24 bg-gray-300/70 dark:bg-gray-600/70" />
              </div>
              <Skeleton className="h-4 w-full mt-3 bg-gray-300/70 dark:bg-gray-600/70" />
            </div>

         
            <div className="bg-white dark:bg-[#262626] p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-5 w-40 bg-gray-300/70 dark:bg-gray-600/70" />
                  <Skeleton className="h-4 w-28 mt-2 bg-gray-300/70 dark:bg-gray-600/70" />
                </div>
                <Skeleton className="h-4 w-24 bg-gray-300/70 dark:bg-gray-600/70" />
              </div>
              <Skeleton className="h-4 w-full mt-3 bg-gray-300/70 dark:bg-gray-600/70" />
            </div>
          </div>
        </div> */}

        {/* Skills Section Skeleton */}
        {/* <div className="mb-8">
          <div className="flex items-center gap-1 mb-3">
            <Skeleton className="h-5 w-5 bg-gray-300/70 dark:bg-gray-600/70" />
            <Skeleton className="h-7 w-20 bg-gray-300/70 dark:bg-gray-600/70" />
          </div>

          <div className="pl-6 space-y-4">
            <div>
              <Skeleton className="h-5 w-24 mb-2 bg-gray-300/70 dark:bg-gray-600/70" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={`design-skill-${i}`}
                    className="h-7 w-20 rounded-full bg-gray-300/70 dark:bg-gray-600/70"
                  />
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-5 w-32 mb-2 bg-gray-300/70 dark:bg-gray-600/70" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={`dev-skill-${i}`}
                    className="h-7 w-24 rounded-full bg-gray-300/70 dark:bg-gray-600/70"
                  />
                ))}
              </div>
            </div>
          </div>
        </div> */}

        {/* Written Blogs Section Skeleton */}
        <div className="mb-8">
          {/* Section Title Skeleton */}
          <div className="flex items-center gap-1 mb-3">
            <Skeleton className="h-5 w-5 bg-gray-300/70 dark:bg-gray-600/70" />
            <Skeleton className="h-7 w-36 bg-gray-300/70 dark:bg-gray-600/70" />
          </div>
          {/* Content Skeleton */}
          <div className="pl-6 space-y-6">
            {/* Blog Post Card Skeleton */}
            {[...Array(4)].map((_, i) => (
              <div
                key={`blog-${i}`}
                className="bg-white dark:bg-[#262626] p-5 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-6 w-3/4 bg-gray-300/70 dark:bg-gray-600/70" />
                  <Skeleton className="h-4 w-20 bg-gray-300/70 dark:bg-gray-600/70" />
                </div>
                <div className="space-y-2 mb-3">
                  <Skeleton className="h-4 w-full bg-gray-300/70 dark:bg-gray-600/70" />
                  <Skeleton className="h-4 w-full bg-gray-300/70 dark:bg-gray-600/70" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton
                      key={`blog-${i}-tag-${j}`}
                      className="h-6 w-24 rounded-full bg-gray-300/70 dark:bg-gray-600/70"
                    />
                  ))}
                </div>
                <Skeleton className="h-4 w-24 bg-gray-300/70 dark:bg-gray-600/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Education Section Skeleton */}
        {/* <div className="mb-8">
          <div className="flex items-center gap-1 mb-3">
            <Skeleton className="h-5 w-5 bg-gray-300/70 dark:bg-gray-600/70" />
            <Skeleton className="h-7 w-28 bg-gray-300/70 dark:bg-gray-600/70" />
          </div>

          <div className="pl-6">
            <div className="bg-white dark:bg-[#262626] p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-5 w-64 bg-gray-300/70 dark:bg-gray-600/70" />
                  <Skeleton className="h-4 w-48 mt-2 bg-gray-300/70 dark:bg-gray-600/70" />
                </div>
                <Skeleton className="h-4 w-20 bg-gray-300/70 dark:bg-gray-600/70" />
              </div>
              <Skeleton className="h-4 w-full mt-3 bg-gray-300/70 dark:bg-gray-600/70" />
            </div>
          </div>
        </div> */}

        {/* Contact Section Skeleton */}
        {/* <div className="mt-10 bg-white dark:bg-[#262626] p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm text-center">
          <Skeleton className="h-7 w-48 mx-auto mb-4 bg-gray-300/70 dark:bg-gray-600/70" />
          <Skeleton className="h-4 w-full max-w-md mx-auto mb-2 bg-gray-300/70 dark:bg-gray-600/70" />
          <Skeleton className="h-4 w-3/4 max-w-md mx-auto mb-6 bg-gray-300/70 dark:bg-gray-600/70" />
          <Skeleton className="h-10 w-32 mx-auto bg-gray-300/70 dark:bg-gray-600/70" />
        </div> */}

        {/* Footer Skeleton */}
        {/* <div className="mt-16 text-center">
          <Skeleton className="h-4 w-36 mx-auto bg-gray-300/70 dark:bg-gray-600/70" />
        </div> */}
      </div>
    </div>
  );
}

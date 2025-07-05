import React from 'react'
import { SkeletonBlock } from './SkeletonLoader'

function CardSkeleton() {
  return (
    <div className="file-card flex animate-pulse flex-col gap-3 rounded-xl bg-neutral-100 p-4 shadow-sm transition-all dark:bg-neutral-800/40">
        <div className="flex justify-between">
          <SkeletonBlock width="w-16" height="h-16" className="rounded-lg" />
          <div className="flex flex-col items-end justify-between gap-2">
            <div className="flex flex-col items-center gap-[3px]">
              <div className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <div className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <SkeletonBlock width="w-14" height="h-3" className="mt-5"/>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <SkeletonBlock width="w-28" height="h-4" />
          <SkeletonBlock width="w-20" height="h-3" />
          <SkeletonBlock width="w-24" height="h-3"/>
        </div>
      </div>
  )
}

export default CardSkeleton

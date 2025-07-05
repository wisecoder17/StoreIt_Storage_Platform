import { useState, useEffect } from 'react';
import clsx from 'clsx';

/**
 * Custom hook for async data fetching with loading state.
 * @param {Function} fetchFunction - Async function to call.
 * @param {Array} deps - Dependency array.
 * @param {number} delay - Optional artificial delay in ms.
 */

export function useSkeletonLoader<T>(
  fetchFunction: () => Promise<T>,
  deps: unknown[] = [],
  delay = 500
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    fetchFunction()
      .then((result) => {
        setTimeout(() => {
          if (mounted) {
            setData(result);
            setIsLoading(false);
          }
        }, delay);
      })
      .catch(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, deps);

  return { isLoading, data };
}

/**
 * Skeleton block component styled via Tailwind CSS.
 * @param {string} width
 * @param {string} height
 * @param {string} rounded
 */
export const SkeletonBlock = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
  className = '',
}) => {
  return (
    <div
      className={clsx(
        // 'animate-pulse bg-neutral-700 dark:bg-neutral-800',
        'bg-neutral-300 dark:bg-neutral-700',
        width,
        height,
        rounded,
        className
      )}
    />
  );
};

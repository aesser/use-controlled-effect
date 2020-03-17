import { useEffect, useRef } from 'react';

// this function is based on https://github.com/samanmohamadi/use-debounced-effect
function useDebouncedEffect(callback: () => void, delay: number, deps: Array<any> = []) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
}

/**
 * Used to run side effects like async server calls either debounced or immediately
 * @param callback method that contains the (side) effect
 * @param runAtOnce defines if effect should run immediately (e.g when deep linking)
 * @param deps callback dependencies
 * @param debounce in ms
 */
export function useControlledEffect(
  callback: () => void,
  runAtOnce: () => boolean,
  deps: Array<any> = [],
  debounce: number = 100,
) {
  const runNow = runAtOnce();
  useDebouncedEffect(
    () => {
      if (!runNow) {
        callback();
      }
    },
    debounce,
    deps,
  );

  useEffect(() => {
    if (runNow) {
      callback();
    }
  }, [...deps]);
}

export default useControlledEffect;

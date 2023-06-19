import useLastThrottleCallback from './useLastThrottleCallback'

function useLastCallback<T extends (...args: any) => ReturnType<T>>(callback: T) {
  return useLastThrottleCallback(callback)
}

export default useLastCallback

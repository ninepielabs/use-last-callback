import { useEffect, useMemo, useRef } from 'react'

function useLastThrottleCallback<T extends (...args: any) => ReturnType<T>>(
  callback: T,
  delay = 0
) {
  const callbackRef = useRef(callback)
  const argsQueueRef = useRef<any[]>([])
  const isRunningRef = useRef(false)
  const timerIdRef = useRef(0)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timerIdRef.current) window.clearTimeout(timerIdRef.current)
    }
  }, [])

  return useMemo(() => {
    const run = async () => {
      if (!argsQueueRef.current.length || isRunningRef.current) return
      const currentArguments = argsQueueRef.current.pop()
      argsQueueRef.current = []
      isRunningRef.current = true

      Promise.resolve(callbackRef.current(...currentArguments)).finally(() => {
        timerIdRef.current = window.setTimeout(() => {
          isRunningRef.current = false
          run()
        }, delay)
      })
    }

    const result = ((...args: any) => {
      argsQueueRef.current.push(args)
      run()
    }) as T

    return result
  }, [delay])
}

export default useLastThrottleCallback

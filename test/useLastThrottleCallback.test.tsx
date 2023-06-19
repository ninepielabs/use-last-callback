import { renderHook, act } from '@testing-library/react'
import useLastThrottleCallback from '../src/useLastThrottleCallback'
import { sleep } from './_util'

const setup = (fn: (...args: any[]) => any, delay: number) =>
  renderHook(() => useLastThrottleCallback(fn, delay))
let hook: ReturnType<typeof setup>
let content = ''

const callback = jest.fn((c: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      content = c
      resolve(c)
    }, 100)
  })
})

describe('useLastThrottleCallback', () => {
  beforeEach(() => {
    content = ''
    act(() => {
      hook = setup(callback, 100)
    })
  })

  afterEach(() => {
    callback.mockClear()
  })

  it('will use the last args when the timer expires', async () => {
    await act(async () => {
      hook.result.current('1'.repeat(1))
      hook.result.current('1'.repeat(2))
      hook.result.current('1'.repeat(3))
      expect(callback).toBeCalledTimes(1)
      await sleep(250) // t = 250
      expect(content).toBe('1')
      expect(callback).toBeCalledTimes(2)
      await sleep(150) // t = 400
      expect(content).toBe('1'.repeat(3))
    })
  })
})

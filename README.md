# use-last-callback

React hooks for last callback

## Install

```
yarn add use-last-callback
```

## Usage

```tsx
import { useState } from 'react'
import { useLastCallback } from 'use-last-callback'

const mockPromise = (content: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(content)
      resolve(content)
    })
  })
}

const Page = () => {
  const [c, setC] = useState(0)
  const lastClickCallback = useLastCallback(mockPromise)

  return (
    <div>
      <button onClick={() => {
        lastClickCallback(c.toString())
        setC(v => v + 1)
      }}>
      Button
    </button>
    </div>
  )
}
```

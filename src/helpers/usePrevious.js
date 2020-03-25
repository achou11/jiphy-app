import * as React from 'react'

// This is taken directly from https://usehooks.com/usePrevious/
function usePrevious (value) {
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export { usePrevious }

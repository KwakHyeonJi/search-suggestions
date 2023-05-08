import { useState, KeyboardEvent } from 'react'

const useKeyboardMove = (
  length: number,
  handleEnterPressed: () => void
): [number, (e: KeyboardEvent<HTMLInputElement>) => void, () => void] => {
  const [focusIndex, setFocusIndex] = useState<number>(-1)

  const handleMoveFocus = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!length) {
      return
    }

    const lastIndex = length - 1

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        setFocusIndex(prevIndex => (prevIndex < lastIndex ? prevIndex + 1 : 0))
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        setFocusIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : lastIndex))
        break
      }
      case 'Escape': {
        setFocusIndex(-1)
        break
      }
      case 'Enter': {
        focusIndex > -1 && handleEnterPressed()
        break
      }
      default: {
        break
      }
    }
  }

  const resetFocus = () => {
    setFocusIndex(-1)
  }

  return [focusIndex, handleMoveFocus, resetFocus]
}

export default useKeyboardMove

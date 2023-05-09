import { useState, KeyboardEvent } from 'react'

const DEFAULT_INDEX = -1

const useKeyboardMove = (
  length: number,
  handleEnterPressed: () => void
): [number, (e: KeyboardEvent<HTMLInputElement>) => void, () => void] => {
  const [focusIndex, setFocusIndex] = useState<number>(DEFAULT_INDEX)

  const handleArrowUp = () => {
    setFocusIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : length - 1))
  }

  const handleArrowDown = () => {
    setFocusIndex(prevIndex => (prevIndex < length - 1 ? prevIndex + 1 : 0))
  }

  const handleEnter = () => {
    if (focusIndex !== DEFAULT_INDEX) {
      handleEnterPressed()
    }
  }

  const resetFocus = () => {
    setFocusIndex(DEFAULT_INDEX)
  }

  const handleMoveFocus = (e: KeyboardEvent<HTMLInputElement>) => {
    const functionFor: { [key: string]: () => void } = {
      ArrowUp: handleArrowUp,
      ArrowDown: handleArrowDown,
      Enter: handleEnter,
      Escape: resetFocus
    }

    if (!length || !Object.keys(functionFor).includes(e.key)) return

    e.preventDefault()
    return functionFor[e.key]()
  }

  return [focusIndex, handleMoveFocus, resetFocus]
}

export default useKeyboardMove

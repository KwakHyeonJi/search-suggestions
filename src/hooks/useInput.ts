import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

const useInput = (
  initialValue: string
): [
  string,
  Dispatch<SetStateAction<string>>,
  (e: ChangeEvent<HTMLInputElement>) => void
] => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return [value, setValue, handleChange]
}

export default useInput

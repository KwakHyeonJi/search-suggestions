import { Suggestion } from '../types/search'

import { instance } from '.'

export const getSuggestions = (name: string): Promise<Suggestion[]> => {
  return instance.get(`${process.env.REACT_APP_API_URL}`, { params: { name } })
}

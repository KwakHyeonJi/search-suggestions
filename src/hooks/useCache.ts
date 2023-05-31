import { useState, useEffect } from 'react'

import { CacheStorage } from '../repository/CacheStorage'

interface UseCacheProps<T> {
  initialData: T
  name: string
  key: string
  duration: number
  fetchData: (name: string) => Promise<T>
}

const useCache = <T>({
  initialData,
  name,
  key,
  duration,
  fetchData
}: UseCacheProps<T>) => {
  const [cachedData, setCachedData] = useState(initialData)
  const cacheStorage = new CacheStorage(name, duration)

  useEffect(() => {
    const fetch = async () => {
      try {
        const newData = await fetchData(key)
        await cacheStorage.put(key, newData)
        setCachedData(newData)
      } catch (error) {
        console.error(error)
      }
    }

    const checkCache = async () => {
      try {
        const cache = await cacheStorage.get(key)
        if (!cache) {
          fetch()
          return
        }

        const expires = cache.headers.get('Expires')
        if (!expires) {
          setCachedData(await cache.json())
          return
        }

        const expiresDate = new Date(expires)
        const currentDate = new Date()
        expiresDate <= currentDate ? fetch() : setCachedData(await cache.json())
      } catch (error) {
        console.error(error)
      }
    }

    key ? checkCache() : setCachedData(initialData)
  }, [key])

  return cachedData
}

export default useCache

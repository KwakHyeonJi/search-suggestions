import { getExpirationDate } from '../utils/cache'

export class CacheStorage {
  private name
  private duration

  constructor(name: string, duration: number) {
    this.name = name
    this.duration = duration
  }

  async get(key: string) {
    const storage = await caches.open(this.name)
    return storage.match(key)
  }

  async put<T>(key: string, data: Awaited<T>) {
    const storage = await caches.open(this.name)
    const response = new Response(JSON.stringify(data), {
      headers: {
        Expires: getExpirationDate(this.duration)
      }
    })
    storage.put(key, response)
  }
}

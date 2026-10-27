import { useEffect, useState } from 'react'

import { site } from '../../data/site'

/** Current time in the site owner's timezone, e.g. "19:05". Updates every 15 seconds. */
export function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timezone }).format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

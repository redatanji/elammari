import { useState, useEffect } from 'react'
import LoadingScreen  from '../components/LoadingScreen'
import ScrollProgress from '../components/ScrollProgress'
import Chapter1       from '../components/chapters/chapter1'
import Chapter2       from '../components/chapters/chapter2'
import Chapter3       from '../components/chapters/chapter3'
import Chapter4       from '../components/chapters/chapter4'
import Chapter5       from '../components/chapters/chapter5'
import SiteFooter     from '../components/SiteFooter'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2300)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {loading && <LoadingScreen />}
      <ScrollProgress />
      <div className="scroll-container">
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
        <Chapter4 />
        <Chapter5 />
        <SiteFooter />
      </div>
    </>
  )
}

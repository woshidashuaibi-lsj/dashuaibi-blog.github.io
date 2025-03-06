'use client'
import dynamic from 'next/dynamic'

// 动态导入避免 SSR 问题
const BallGame = dynamic(() => import('./components/BallGame'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      Loading Game...
    </div>
  )
})

export default function ThreePage() {
  return <BallGame />
}
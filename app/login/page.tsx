'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('パスワードが違います 🔐')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)' }}
    >
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3 flex justify-center gap-2">
            <span>🏔️</span><span>🎈</span><span>🏯</span>
          </div>
          <h1 className="text-white font-black text-2xl">GW2026 しおり</h1>
          <p className="text-white/50 text-sm mt-1">パスワードを入力してください</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            autoFocus
            className="w-full px-4 py-3 rounded-2xl text-center text-lg font-bold bg-white/10 text-white placeholder-white/30 border border-white/20 focus:outline-none focus:border-white/60 transition"
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-2xl font-black text-lg text-white transition-all disabled:opacity-40"
            style={{ background: 'linear-gradient(90deg, #FF8C00, #FF4500)' }}
          >
            {loading ? '確認中...' : '入る 🚪'}
          </button>
        </form>
      </div>
    </div>
  )
}

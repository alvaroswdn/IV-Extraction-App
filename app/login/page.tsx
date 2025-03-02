'use client'

import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="m-auto flex max-w-5xl flex-col items-center gap-6 p-4">
      <form action={login} className="grid h-full gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="bg-quinary text-secondary rounded-full border-none px-3 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="bg-quinary text-secondary rounded-full border-none px-3 py-2"
        />
        <button type="submit" className="bg-quinary cursor-pointer rounded-full px-3 py-2">
          Login
        </button>
      </form>
      <style jsx global>{`
        body {
          color: var(--secondary);
          background: linear-gradient(to bottom, #98c1d9, #516673);
        }
      `}</style>
    </main>
  )
}

'use client'

import { useProgress } from '@bprogress/next'
import { useActionState, useEffect } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const progress = useProgress()
  const [state, formAction, pending] = useActionState(login, { message: '' })

  useEffect(() => {
    if (pending) {
      progress.start()
    } else {
      progress.stop()
    }
  }, [pending, progress])

  return (
    <main className="m-auto flex h-screen max-w-5xl flex-col items-center justify-center gap-12 p-4">
      <div className="text-center text-neutral-900">
        <h2 className="text-2xl font-semibold">Welcome to</h2>
        <h1 className="text-2xl font-bold">IV Waste Management System</h1>
        <p className="text-secondary">Log in to your account to continue</p>
      </div>
      <form action={formAction} className="flex flex-col items-center gap-4">
        <h2>{state.message}</h2>
        <div className="bg-quinary text-secondary relative w-full rounded-full">
          <label
            htmlFor="email"
            className="pointer-events-none absolute top-2 left-8 text-sm font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded-full px-8 pt-7 pb-2"
            required
          />
        </div>
        <div className="bg-quinary text-secondary relative w-full rounded-full">
          <label htmlFor="email" className="absolute top-2 left-8 text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded-full px-8 pt-7 pb-2"
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="bg-quinary w-fit cursor-pointer rounded-full px-12 py-3 transition-colors hover:bg-slate-300 disabled:bg-slate-200"
        >
          Login
        </button>
      </form>
      <style jsx global>{`
        body {
          background: linear-gradient(to bottom, #98c1d9, #516673);
        }
      `}</style>
    </main>
  )
}

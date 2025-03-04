'use client'

import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="m-auto flex h-screen max-w-5xl flex-col items-center justify-center gap-12 p-4">
      <div className="text-center text-neutral-900">
        <h2 className="text-2xl font-semibold">Welcome to</h2>
        <h1 className="text-2xl font-bold">IV Waste Management System</h1>
        <p className="text-secondary">Log in to your account to continue</p>
      </div>
      <form action={login} className="flex flex-col items-center gap-4">
        <div className="relative">
          <label
            htmlFor="email"
            className="pointer-events-none absolute top-2 left-6 text-sm font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-quinary text-secondary rounded-full border-none px-5 pt-8 pb-2"
          />
        </div>
        <div className="relative">
          <label htmlFor="email" className="absolute top-2 left-6 text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="bg-quinary text-secondary rounded-full border-none px-5 pt-8 pb-2"
          />
        </div>
        <button
          type="submit"
          className="bg-quinary w-fit cursor-pointer rounded-full px-5 pt-6 pb-2"
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

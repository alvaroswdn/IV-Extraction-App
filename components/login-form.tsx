'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'

import { FormSchema } from '@/app/login'
import { login } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { startTransition, useActionState, useRef } from 'react'

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [state, formAction, pending] = useActionState(login, { message: '' })

  const form = useForm<v.InferOutput<typeof FormSchema>>({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className={cn('flex flex-col gap-6', className)}
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault()
          form.handleSubmit(() => {
            startTransition(() => formAction(new FormData(formRef.current!)))
          })(event)
        }}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
          {state.message && <p className="text-destructive">{state.message}</p>}
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input id="email" type="email" placeholder="m@example.com" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <Input id="password" type="password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-foreground w-full cursor-pointer" disabled={pending}>
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}

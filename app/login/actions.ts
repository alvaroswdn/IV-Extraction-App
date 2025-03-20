'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as v from 'valibot'

import { createClient } from '@/utils/supabase/server'
import { FormSchema } from '.'

export type LoginForm = {
  data: v.InferOutput<typeof FormSchema>
  errors: string[]
}

export async function login(prevState: { message: string }, formData: FormData) {
  const supabase = await createClient()

  const parsing = v.safeParse(FormSchema, {
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsing.success) {
    return { message: parsing.issues[0].message }
  }

  const { error } = await supabase.auth.signInWithPassword(parsing.output)

  if (error) {
    return { message: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

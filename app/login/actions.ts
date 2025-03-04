'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as v from 'valibot'

import { createClient } from '@/utils/supabase/server'

const LoginSchema = v.object({
  email: v.pipe(
    v.string('The email you entered is not a string'),
    v.nonEmpty('The email field is missing from the form'),
    v.email('The email you entered is not a valid email'),
  ),
  password: v.pipe(
    v.string('The password you entered is not a string'),
    v.nonEmpty('The password field is missing from the form'),
    v.minLength(8, 'The password you entered is too short'),
  ),
})

export type LoginForm = {
  data: v.InferOutput<typeof LoginSchema>
  errors: string[]
}

export async function login(prevState: { message: string }, formData: FormData) {
  const supabase = await createClient()

  const parsing = v.safeParse(LoginSchema, {
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

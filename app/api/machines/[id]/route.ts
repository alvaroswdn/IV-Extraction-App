import { createClient } from '@/utils/supabase/server'
import * as v from 'valibot'

const PostData = v.object({
  id: v.number(),
  bags: v.pipe(v.number(), v.minValue(0)),
  volume: v.pipe(v.number(), v.minValue(0)),
  weight: v.pipe(v.number(), v.minValue(0)),
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
})

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const formData = await request.formData()

  const parse = v.safeParse(PostData, {
    id: id,
    bags: formData.get('bags'),
    volume: formData.get('volume'),
    weight: formData.get('weight'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parse.success) {
    return new Response(`Missing required fields: ${parse.issues.join(' | ')}`, { status: 400 })
  }

  const data = parse.output

  const supabase = await createClient()

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (signInError) {
    return new Response(`Error signing in: ${signInError.message}`, { status: 500 })
  }

  const { error: updateError } = await supabase
    .from('machines')
    .update({
      bags: data.bags,
      volume: data.volume,
      weight: data.weight,
      updated_at: new Date().toISOString(),
    })
    .eq('id', data.id)

  if (updateError) {
    return new Response(`Error updating machine: ${updateError.message}`, { status: 500 })
  }

  return new Response(null, { status: 200 })
}

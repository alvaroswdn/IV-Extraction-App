import { createClient } from '@/utils/supabase/server'
import { decode } from 'decode-formdata'
import { NextResponse } from 'next/server'
import * as v from 'valibot'

type DefaultResponse = {
  success: boolean
  message: string
  errors: string[]
}

const PostData = v.object(
  {
    bags: v.pipe(
      v.number('The bags field must be a number'),
      v.minValue(0, 'The bags field must be greater than 0'),
    ),
    volume: v.pipe(
      v.number('The volume field must be a number'),
      v.minValue(0, 'The volume field must be greater than 0'),
    ),
    weight: v.pipe(
      v.number('The weight field must be a number'),
      v.minValue(0, 'The weight field must be greater than 0'),
    ),
    email: v.pipe(
      v.string('The email field must be a string'),
      v.email('The email field must be a valid email address'),
    ),
    password: v.pipe(
      v.string('The password field must be a string'),
      v.minLength(8, 'The password field must be at least 8 characters long'),
    ),
  },
  (i) => `The ${v.getDotPath(i)} field is required`,
)

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<DefaultResponse>> {
  const id = parseInt((await params).id)
  const formData = await request.formData()

  const parse = v.safeParse(
    PostData,
    decode(formData, {
      numbers: ['bags', 'volume', 'weight'],
    }),
  )

  if (!parse.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid form data',
        errors: parse.issues.map((i) => i.message),
      },
      {
        status: 400,
      },
    )
  }

  const data = parse.output

  const supabase = await createClient()

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (signInError) {
    return NextResponse.json(
      { success: false, message: 'Failed to sign in to account', errors: [signInError.message] },
      {
        status: 500,
      },
    )
  }

  const { error: updateError, data: entry } = await supabase
    .from('machines')
    .update({
      bags: data.bags,
      volume: data.volume,
      weight: data.weight,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (!entry || entry.length === 0) {
    return NextResponse.json(
      { success: false, message: 'Machine not found', errors: [] },
      { status: 404 },
    )
  }

  if (updateError) {
    return NextResponse.json(
      { success: false, message: 'Error updating machine data', errors: [updateError] },
      {
        status: 500,
      },
    )
  }

  return NextResponse.json(
    { success: true, message: 'Machine updated successfully', errors: [] },
    { status: 200 },
  )
}

import * as v from 'valibot'

export const FormSchema = v.object({
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

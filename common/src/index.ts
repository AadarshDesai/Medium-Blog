import z from 'zod';

//Sign up validations
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string()
})

//Sign in validations
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

//Create blog validations
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})

//Update blog validations.
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type creareBlogInput = z.infer<typeof createBlogInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>
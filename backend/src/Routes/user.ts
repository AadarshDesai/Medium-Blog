import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from "@aadarsh.codes/medium-common"


type Bindings = {
    DATABASE_URL: string
    JWT_SECRET: string
}

export const userRouter = new Hono<{Bindings: Bindings}>();

// Signup Route
userRouter.post('/signup', async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
  const salt = genSaltSync(10);
  const hashedPass = hashSync(body.password, salt);
  try{
    const user = await prisma.user.create({
      data:{
        email: body.email,
        name: body.name,
        password: hashedPass
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token })
  }catch(e) {
    c.status(411);
    return c.text("User already exist!")
  }
})
  
  //Signin Route
userRouter.post('/signin', async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
  try{
    const user = await prisma.user.findUnique({
      where :{
        email: body.email
      }
    });
    if(user && compareSync(body.password, user.password)){
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({jwt: token })
    } else {
      return c.json({error: "Incorrect username or password"})
    }
  }catch(e){
    c.status(411);
    return c.json({"Error": "Invalid"});
  }
})
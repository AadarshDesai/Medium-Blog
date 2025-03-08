import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'


type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

const app = new Hono<{Bindings: Bindings}>()

app.post('/api/v1/user/signup', async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const salt = genSaltSync(10);
  const hashedPass = hashSync(body.password, salt);

  const user = await prisma.user.create({
    data:{
      email: body.email,
      name: body.name,
      password: hashedPass
    }
  })


  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ jwt: token })
})

app.post('/api/v1/user/signin', async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where :{
      email: body.email
    }
  });

  console.log(user)

  if(user && compareSync(body.password, user.password)){
    // c.status(403)
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({ message : "Password matches", jwt: token })
  } else {
    return c.json({error: "Incorrect username or password"})
  }

})

app.post('/api/v1/blog', (c)=>{
  return c.text('Blog post route')
})

app.put('/api/v1/blog', (c)=>{
  return c.text('Blog put route')
})

app.get('/api/v1/blog/:id', (c)=>{
  return c.text('get single blog route')
})


app.get('/api/v1/blog/bulk', (c) => {
  return c.text('get multiple blogs route!')
})

export default app

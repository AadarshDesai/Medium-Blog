import { Hono } from "hono";
import { verify } from "hono/jwt";

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}

export const blogRouter = new Hono<{Bindings: Bindings}>();

//Middleware to verify the JWT token.
blogRouter.use('/api/v1/blog/*', async (c, next) => {
    const header = c.req.header("Authorization") || "" ;
    const token = header.split(" ")[1];
    const response = await verify(token, c.env.JWT_SECRET)
    if(response.id){
      next()
    }else {
      c.status(403)
      return c.json({error: "Unauthorized!"})
    }
    await next()
})

//Route to post a blog.
blogRouter.post('/', (c)=>{
    return c.text('Blog post route')
})

//Route to update the blog.
blogRouter.put('/', (c)=>{
    return c.text('Blog put route')
})

//Route to get a specific blog. 
blogRouter.get('/:id', (c)=>{
    return c.text('get single blog route')
})

//Route to get all the blogs.
blogRouter.get('/bulk', (c) => {
    return c.text('get multiple blogs route!')
})
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogInput, updateBlogInput} from "@aadarsh.codes/medium-common"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

//Middleware to verify the JWT token.
blogRouter.use('/*', async (c, next) => {
    const authheader = c.req.header("authorization") || "";
    const token = authheader.split(" ")[1];
    try{
        const resp = await verify(token, c.env.JWT_SECRET);
        if(resp){
            //@ts-ignore
            c.set("userId", resp.id);
            await next();
        }else { 
            c.status(403)
            return c.json({error: "You are not logged in!"})
        }
    }catch(e){
        c.status(403);
        return c.json({error: "Token Verification Failed!"})
    }
    
})

//Route to post a blog.
blogRouter.post('/', async (c)=> {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message: "Inputs not correct"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const newPost = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: newPost.id
    })
})

//Route to update the blog.
blogRouter.put('/', async (c)=>{
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: blog.id
    })
})

//Route to get all the blogs.
//Add pagination. - Just return first 10 blogs only instead of returning all the blogs.
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            id: true,
            content: true,
            title: true,
            author: {
                select : {
                    name: true,   
                }
            }
        }
    });
    return c.json({
        blogs
    })
})

//Route to get a specific blog. 
blogRouter.get('/:id', async (c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        c.status(411);
        return c.json({error: "Error fetching blog!"})
    }
})
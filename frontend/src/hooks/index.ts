import { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";


export interface Blog {
    title: string;
    content: string;
    id: string;
    author: {
        name: string
    };
}

export const useBlog = ({ id } : { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    console.log(blog);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: "Bearer "+token
            }
        })
            .then(response => { 
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: "Bearer "+token
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}
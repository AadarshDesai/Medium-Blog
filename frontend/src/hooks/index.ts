import { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";


interface Blog {
    title: string;
    content: string;
    id: string;
    author: {
        name: string
    };
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
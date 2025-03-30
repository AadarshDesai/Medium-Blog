import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";


export function Blogs() {
    const {loading, blogs} = useBlogs();
    if(loading){
        return <div>
            Loading...
        </div>
    }
    return <div>
        <Appbar/>
        <div className="flex justify-center">
        <div>
            {blogs.map(blog => <BlogCard 
            id = {blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedOn={"29th March 2025"}
        /> )}
        </div>
        </div>
        </div>
}
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
    <div className="max-w-xl">
    <BlogCard 
        authorName={"Aadarsh Desai"}
        title={"Axios To Connect Frontend With Backend"}
        content={"Axios is a library used to connect to your backend from the frontend by just using axios.post('api link to your backend'), it takes away the load of manual configuration."}
        publishedOn={"29th March 2025"}
    />
    </div>
    </div>
    </div>
}
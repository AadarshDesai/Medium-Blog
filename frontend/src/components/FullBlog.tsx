import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"


export const FullBlog = ({ blog } : {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 pt-20 w-full max-w-screen-2xl">
                <div className="  col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-gray-400 pt-2">
                        Posted on 30th March 2025
                    </div>
                    <div className="text-xl font-light pt-2">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <span className="text-lg pb-1 text-slate-600">Author</span>
                    <div className="flex">
                        <div className="pr-4 flex justify-center flex-col">
                            <Avatar name={blog.author.name} size="big"  />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem laudantium fugit autem neque. Unde voluptate eius illo tenetur vero autem porro atque voluptatem.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
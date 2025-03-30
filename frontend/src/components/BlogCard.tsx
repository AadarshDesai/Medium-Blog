
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedOn: string;
}


export function BlogCard({
    authorName,
    title,
    content,
    publishedOn
} : BlogCardProps) {
    return <div className="border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <Avatar name={authorName} />
            <div className="pl-2 font-extralight text-sm flex justify-center flex-col">{authorName}</div>
            <div className="flex justify-center flex-col pl-2 pt-1">
                <Circle />
            </div>
            <div className="text-slate-500 text-sm font-thin pl-2 flex justify-center flex-col">
                {publishedOn}
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "... "}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/1000)} min(s) read`}
        </div>
    </div>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: {name:string, size?: "small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-8 h-8"}`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-300`}>
            {name.split(" ")[0][0]+name.split(" ")[1][0]}
        </span>
    </div>
}
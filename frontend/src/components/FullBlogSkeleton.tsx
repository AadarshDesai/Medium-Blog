import { Circle } from "./BlogCard";


export function FullBlogSkeleton(){
    return <div role="status" className="animate-pulse">
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 pt-20 w-full max-w-screen-2xl">
                <div className="  col-span-8 pr-20">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="col-span-4 pl-20">
                <div className="h-2 w-20 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="flex">
                        <div className="pr-4 flex justify-center flex-col">
                            <Circle />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                            <div className="pt-2 text-slate-500">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
    </div>
}
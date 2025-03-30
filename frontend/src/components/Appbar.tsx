import { Avatar } from "./BlogCard"


export const Appbar = () => {
    return <div className="border-b border-b-slate-300 flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar 
            size="big"
            name="Aadarsh Desai"
            />
        </div>
    </div>
}
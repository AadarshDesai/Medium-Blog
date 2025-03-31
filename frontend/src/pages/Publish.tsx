import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Publish(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    return <div>
        <Appbar />
        <div className="flex justify-center flex-col">
        <div className="w-screen px-10 pb-10 pt-10">
            <label className="block text-3xl mb-2 font-medium text-gray-900">Title</label>
            <input onChange={(e) =>{
                setTitle(e.target.value);
            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5" placeholder="Title"></input>
        </div>
        <div className="w-screen px-10">
            <label className="block text-3xl mb-2 font-medium text-gray-900">Content</label>
            <div>
            <textarea onChange={(e) => {
                setDescription(e.target.value);
            }} rows={10} cols={118} placeholder="Write your content here..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-4"></textarea>
            </div>
        </div>
        <div className="px-10 pt-4">
            <button onClick={ async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content: description
                }, {
                    headers:{
                        Authorization: "Bearer "+token
                    }
                });
                navigate(`/blog/${response.data.id}`)
            }} className="border border-gray-300 bg-green-700 p-4 rounded-xl text-white hover:bg-green-900 cursor-pointer">Publish</button>
        </div>
    </div>
    </div>
}
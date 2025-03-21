import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import {signupInput} from "@aadarsh.codes/medium-common"

//Read about TRPC project for more strict type safety on both frontend and backend.
export function Auth({type}: {type: "signup" | "signin"}){
    const [postInputs, setPostInputs] = useState<signupInput>({
        email: "",
        password: "",
        name: ""
    }) //This is how we can add types to state variables.

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10 text-center">
                    <div className="text-3xl font-bold">
                        {type === "signup" ? "Create an account" : "Welcome to Medium"}
                    </div>
                    <div className="text-slate-400 pb-2">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link to={type === "signup" ? "/signin" : "/signup"} className="underline pl-2">{type === "signup" ? "Login" : "Sign Up"}</Link>
                    </div>
                </div>
                <div className="pt-4">
                    <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }}/>
                    {type === "signup" ? 
                        <LabelledInput label="Email" placeholder="email@example.com" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }}/> : <></>
                    }
                    
                    <LabelledInput label="Password" type={"password"} placeholder="********" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}/>
                    <button type="button" className="w-full mt-4 text-white bg-black hover:bg-gray-900 
                    focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 
                    py-2.5 mb-2" >{type === "signup" ? "Sign Up" : "Sign In"}</button>
                </div>
            </div>
        </div>
        
    </div>
}

interface LabelledInputtype {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void //I Don't understand.
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputtype){
    return <div>
        <label className="block mb-1 text-sm font-semibold text-gray-900 pt-2">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="border border-gray-300 text-gray-900 text-sm 
        rounded-lg w-full p-2.5" placeholder={placeholder} required />
    </div>
}
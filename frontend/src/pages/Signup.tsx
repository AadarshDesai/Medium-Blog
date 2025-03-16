import { Quote } from "../components/Quote"

export function Signup() {
    return <>
    <div className="grid grid-cols-2">
        <div></div>
        <div className="invisible lg:visible">
            <Quote/>
        </div>
    </div>
    </>
}
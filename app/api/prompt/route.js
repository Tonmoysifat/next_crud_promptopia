import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req)=>{
    try {
        await connectToDB()
        const prompts = await Prompt.find({}).populate("promptCreator")
        return new Response(JSON.stringify(prompts),{status:200})
    }
    catch (e) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}
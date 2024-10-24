"use client"

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Profile from "@components/Profile";
import {useEffect, useState} from "react";

const myProfile = () => {
    const [allPosts, setAllPosts] = useState([])
    const {data:session} = useSession()
    const router = useRouter()
    useEffect(() => {
        const fetchAllPosts = async ()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const result = await response.json()
            setAllPosts(result)
        }
        if (session?.user.id) fetchAllPosts()
    }, [session?.user.id]);
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const confirmDelete = confirm("Are you sure you want to delete this prompt?")
        if (confirmDelete){
            try {
                const response = await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:"DELETE"
                })

                const filteredPosts = allPosts.filter((item)=> item._id !== post._id)
                setAllPosts(filteredPosts)
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page.
            Share your exceptional prompts and inspire others with the power of your imagination"
            data={allPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default myProfile;
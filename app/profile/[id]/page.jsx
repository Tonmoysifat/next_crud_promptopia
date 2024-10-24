"use client"

import Profile from "@components/Profile";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

const UserProfile = ({params}) => {
    const [allPosts, setAllPosts] = useState([])
    const searchParams = useSearchParams()
    const username = searchParams.get("name")
    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const result = await response.json()
            setAllPosts(result)
        }
        if (params?.id) fetchAllPosts()
    }, [params?.id]);
    return (
        <Profile
            name={username+"'s"}
            desc={`Welcome to ${username}'s personalized profile page. 
            Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
            data={allPosts}
        />
    );
};

export default UserProfile;
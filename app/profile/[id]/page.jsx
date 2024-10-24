"use client"

import Profile from "@components/Profile";
import {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

function OtherUserPro ({params}){
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
}
const UserProfile = ({params}) => {
    return(
        <Suspense>
            <OtherUserPro params={params}/>
        </Suspense>
    )
};

export default UserProfile;
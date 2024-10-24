"use client"
import Form from "@components/Form";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation"
import {Suspense} from 'react'

function UpdateComp() {
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    useEffect(() => {
        const getPromptData = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const result = await response.json()
            setPost({
                prompt: result.prompt,
                tag: result.tag
            })
        }
        if (promptId) getPromptData();
    }, [promptId]);
    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (!promptId) return alert("Missing PromptId!")
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push("/")
            }
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form
            type="Update"
            submitting={submitting}
            post={post}
            setPost={setPost}
            handleSubmit={updatePrompt}
        />
    );
}

const UpdatePrompt = () => {
    return (
        <Suspense>
            <UpdateComp/>
        </Suspense>
    )
};
export default UpdatePrompt;
"use client"
import React, {useEffect, useState} from 'react'
import PromptCard from "@components/PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState("")
    const [searchTimeOut, setSearchTimeOut] = useState(null)
    const [searchedResult, setSearchedResult] = useState([])
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/prompt")
            const result = await response.json()
            setAllPosts(result)
        })()
    }, []);

    const filterPrompts = (searchItem) => {
        const regex = new RegExp(searchItem, "i")
        return allPosts.filter((item) =>
            regex.test(item.promptCreator.username) ||
            regex.test(item.prompt) ||
            regex.test(item.tag))
    }
    const handleSearchText = async (e) => {
        clearTimeout(searchTimeOut)
        setSearchText(e.target.value)
        setSearchTimeOut(
            setTimeout(()=>{
                const searchResult = filterPrompts(e.target.value)
                setSearchedResult(searchResult)
            },500)
        )
    }
    const handleTagClick = (tagName)=>{
        setSearchText(tagName)
        const searchResult = filterPrompts(tagName)
        setSearchedResult(searchResult)
    }
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    required
                    className="search_input peer"
                    value={searchText}
                    onChange={handleSearchText}
                />
            </form>
            {searchText ? (<PromptCardList
                data={searchedResult}
                handleTagClick={handleTagClick}
            />):(<PromptCardList
                data={allPosts}
                handleTagClick={handleTagClick}
            />)}

        </section>
    )
}

export default Feed
import React, { useEffect, useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";

const Post = ({ post , onDelete}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [images, setImages] = useState([]);
  const [likedby, setLikedby] = useState(post.likedby || []);
  const [showDropdown, setShowDropdown] = useState(false); 
  const [ user , setUser] = useState([])
  useEffect(() => {
    const storedPosts = JSON.parse(window.localStorage.getItem("posts")) || [];
    setImages(storedPosts);

    const user = JSON.parse(window.localStorage.getItem("userdata"));
    setUser(user)
    if (post.likedby?.includes(user.name)) {
      setLiked(true);
    }
  }, [post]);

  const handleLike = (postId) => {
    const user = JSON.parse(window.localStorage.getItem("userdata"));
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setLiked(newLiked);
    setLikes(newLikes);

    const updatedLikedby = newLiked
      ? [...likedby, user.name]
      : likedby.filter((name) => name !== user.name);

    setLikedby(updatedLikedby);

    const updatedImages = images.map((img) =>
      img.id === postId ? { ...img, likes: newLikes, likedby: updatedLikedby } : img
    );
    setImages(updatedImages);
    window.localStorage.setItem("posts", JSON.stringify(updatedImages));
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };
  const handleDelete = () => {
    onDelete(post.id); 
  };
  return (
    <React.Fragment>
      <div className="flex flex-row justify-between cursor-pointer font-bold mb-3">
        <h1 className="border-4 border-pink-700 rounded-lg p-1">
          {post.uploader || Math.floor((Math.random() * 90) + 10)}
        </h1>
        <div className="relative">
          <HiDotsHorizontal onClick={toggleDropdown} className="cursor-pointer" />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul className="py-1">
               {
                user.name === post.uploader ? <>           <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleDelete}>Delete</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Share</li></> : <> <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Share</li></>
               }
      
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={post.image} alt="Post cover" />
        </a>
        <div className="p-5 flex flex-row justify-between items-center relative">
          <div className="flex flex-row gap-1 cursor-pointer">
            <button onClick={() => handleLike(post.id)}>
              {liked ? (
                <AiOutlineLike size={30} color="blue" fill="blue" />
              ) : (
                <AiOutlineLike size={30} color="black" />
              )}
            </button>
            <span className="ml-2 text-lg font-semibold">{likes}</span>
          </div>
          <div className="flex flex-row gap-1">
            <h5 className="mb-2 font-bold text-black">Uploaded at</h5>
            <h5 className="mb-2 font-bold text-black">{post.timestamp}</h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post;

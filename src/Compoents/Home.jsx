import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import { IoMdAdd } from "react-icons/io";
import Model from './Model';

const Home = () => {
  const router = useNavigate();
  const handleRoute = () => {
    router("/Profile");
  };

  const [show, setShow] = useState(false);
  const [Postes, setPost] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]); 
  const [user, setUser] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [cheked , setChecked] = useState(false)

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userdata"));
    setUser(userData);
    if (!userData) {
      router("/");
    }
    const post = JSON.parse(window.localStorage.getItem("posts"));
    if (post) {
      setPost(post);
      setOriginalPosts(post); 
    }
  }, [router]);

  const addPost = (newPost) => {
    const updatedPosts = [newPost, ...Postes];
    setPost(updatedPosts);
    setOriginalPosts(updatedPosts); 
    window.localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDateChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = Postes.filter(post => post.id !== postId);
    setPost(updatedPosts);
    window.localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };
  const handleSubmit = () => {
    if (dateTime) {
      const selectedDate = new Date(dateTime);
      const formattedDateTime = selectedDate.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const filterPost = originalPosts.filter((value) => value.timestamp === formattedDateTime);
      setPost(filterPost);
    }
  };
  const  getTopLikedPost =(posts)=> {
 
    const sortedPosts = posts.sort((a, b) => b.likes - a.likes);

   
    const maxLikes = sortedPosts[0].likes;
    const topLikedPosts = sortedPosts.filter(post => post.likes === maxLikes);

    return topLikedPosts;
}

  const handleReset = () => {
    setPost(originalPosts); 
    setDateTime(""); 
  };
  const handleTopLikedPost = () => {
    setChecked(!cheked);
    if (!cheked) {
      setPost(getTopLikedPost(originalPosts));
    } else {
      setPost(originalPosts);
    }
  };
  return (
    <React.Fragment>
      <div className="flex flex-1 justify-center items-center">
        <div className='flex flex-col'>
          <h1 className='text-2xl text-pink-800 justify-center flex align-middle font-bold'>Home Page</h1>
          <div className='mt-5'>
            <label htmlFor="birthdaytime">Birthday (date and time):</label>
            <div className='flex items-center gap-2'>
              <input
                type="datetime-local"
                id="birthdaytime"
                name="birthdaytime"
                value={dateTime}
                onChange={handleDateChange}
                className='border rounded p-1'
              />
              <button onClick={handleSubmit} className='bg-blue-500 text-white rounded px-4 py-2'>Submit</button>
              <button onClick={handleReset} className='bg-red-500 text-white rounded px-4 py-2'>Reset</button> 
          
            </div>
            <div className=''>
            <input
            value={cheked}
                type="checkbox"
               placeholder='Top Liked Post'
                onChange={handleTopLikedPost}
               
                className='border rounded p-1'
                
              /> <span> Top Liked Post</span>
            </div>
          </div>
          <div className='justify-center mt-5 flex flex-col gap-5 '>
            {Postes && Postes.map((data, index) => (
              <div key={index}>
                <Post post={data} onDelete={handleDeletePost} />
              </div>
            ))}
          </div>
        </div>
        <div className='fixed right-5 top-5 font-bold'>
          <button onClick={handleRoute}>
            <h1 className="text-pink-800 text-2xl border-2 p-2 rounded-lg border-pink-700">{user.name}</h1>
          </button>
        </div>
        <div>
          <div className='flex justify-center align-middle'>
            <button className='bg-purple-700 fixed bottom-5 left-5 justify-center rounded-2xl shadow-2xl' onClick={handleShow}>
              <IoMdAdd size={50} />
            </button>
          </div>
        </div>
      </div>
      {show && <Model addPost={addPost} />}
    </React.Fragment>
  );
};

export default Home;

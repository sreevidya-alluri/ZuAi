import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./index.css";
import api from '../../api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts from the API
    api.get('/posts')
      .then(response => {
        console.log('Data fetched:', response.data); // Log the response data for debugging
        setPosts(response.data); // Set posts state with the fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching posts:', error); // Log the error for debugging
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`); // Navigate to the PostForm component for editing
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      api.delete(`/posts/${id}`)
        .then(response => {
          console.log('Post deleted:', response.data);
          setPosts(posts.filter(post => post.id !== id)); // Remove the deleted post from the list
        })
        .catch(error => {
          console.error('Error deleting post:', error); // Log the error for debugging
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className='post-list'>
      <h2>Blog Posts</h2>
      <div className='post-container'>
        {posts.map(post => (
          <div key={post.id} className='post-box'>
            <Link to={`/posts/${post.id}`} className='post-link'>
              <h3>{post.name}</h3>
              <p>{post.description}</p>
            </Link>
            <div className='post-actions'>
              <button style={{backgroundColor:"GrayText"}} onClick={() => handleUpdate(post.id)}>Update</button>
              <button style={{backgroundColor:"red"}} onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;

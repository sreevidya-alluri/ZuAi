import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import "./index.css";

function PostForm() {
  const { id } = useParams(); // Extract the ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [post, setPost] = useState({ name: '', description: '' }); // State for the post data
  const [loading, setLoading] = useState(false); // State for loading indication
  const [error, setError] = useState(null); // State for error handling

  // Fetch the post data if an ID is provided
  useEffect(() => {
    if (id) {
      setLoading(true); // Set loading state to true while fetching data
      api.get(`/posts/${id}`)
        .then(response => {
          setPost(response.data); // Set the post data from the response
          setLoading(false); // Set loading state to false once data is fetched
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          setError('Failed to fetch post data');
          setLoading(false); // Set loading state to false even if there's an error
        });
    }
  }, [id]); // Only re-run the effect if the ID changes

  // Handle input changes and update the post state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  // Handle form submission to create or update a post
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const method = id ? 'PUT' : 'POST'; // Determine whether to create or update
    const url = id ? `/posts/${id}` : '/posts'; // Set the appropriate endpoint

    // Send the request to the backend
    api({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: post, // Send the post data in the request body
    })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          navigate('/'); // Navigate back to the home page if successful
        } else {
          console.error('Error saving post', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error saving post:', error);
        setError('Failed to save post');
      });
  };

  // If data is still loading, show a loading message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>; // Show error message if any

  // Render the form for creating or editing a post
  return (
    <div className='post-form'>
      <h2>{id ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={post.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={post.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>
        </div>
        <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
}

export default PostForm;

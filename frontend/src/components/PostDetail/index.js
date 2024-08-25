import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/posts/${id}`)
        .then(response => {
          setPost(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          setError('Failed to fetch post');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!post) return <p>No post found.</p>;

  return (
    <div>
      <h2>{post.name}</h2>
      <p>{post.description}</p>
    </div>
  );
}

export default PostDetail;

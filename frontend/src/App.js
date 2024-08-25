import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<PostForm />} /> {/* Route for creating new posts */}
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<PostForm />} /> {/* Route for editing existing posts */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

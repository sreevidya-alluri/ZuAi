import React from 'react';
import "./index.css";

function Header() {
  return (
    <header style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div className='move'>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Blog App</h1>
      <button onClick={() => window.location.href = '/posts/new'}>Create Post</button>
      </div>
    </header>
  );
}

export default Header;
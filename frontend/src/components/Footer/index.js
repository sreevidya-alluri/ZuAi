import React from 'react';

function Footer() {
  // Define inline styles for the footer
  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
    borderTop: '1px solid #444',
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

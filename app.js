import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkBuilder = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const userId = 'exampleUserId'; // Replace with real user ID

  // Fetch links on mount
  useEffect(() => {
    axios.get(`/api/links/${userId}`).then((res) => setLinks(res.data));
  }, []);

  // Add a new link
  const addLink = () => {
    axios.post('/api/links', { ...newLink, userId, order: links.length }).then((res) => {
      setLinks([...links, res.data]);
      setNewLink({ title: '', url: '' });
    });
  };

  // Delete a link
  const deleteLink = (id) => {
    axios.delete(`/api/links/${id}`).then(() => {
      setLinks(links.filter((link) => link._id !== id));
    });
  };

  return (
    <div>
      <h2>Link Builder</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <button onClick={addLink}>Add Link</button>
      </div>
      <ul>
        {links.map((link, index) => (
          <li key={link._id}>
            <span>{index + 1}. {link.title} - {link.url}</span>
            <button onClick={() => deleteLink(link._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkBuilder;

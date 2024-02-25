import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const navigate = useNavigate();
    const [addedPost, setAddedPost] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [randomPosts, setRandomPosts] = useState([]);

    const [showAddPostForm, setShowAddPostForm] = useState(false);
    const [postDescription, setPostDescription] = useState('');
    const [postTags, setPostTags] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [searchFilter, setSearchFilter] = useState('posts');
    const [randomPostsFetched, setRandomPostsFetched] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (!data) {
            navigate(`/`);
        }
        if (!randomPostsFetched) {
            fetchRandomPosts();
            setRandomPostsFetched(true);
        }
    });

    const data = localStorage.getItem('user');
    const userData = JSON.parse(data);

    const handleSearch = async (searchTerm) => {
        try {
            setLoading(true);
            const response = await fetch(`https://spotless-pullover-hen.cyclic.app/users/${searchTerm}/posts`);
            const data = await response.json();

            if (response.ok) {
                const postsDownloadUrls = data.data.map((post) => post.download_url);
                setSearchResults(postsDownloadUrls);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching for user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPost = async () => {
        try {
            setLoading(true);

            // Add logic to handle file input (postImage) and send it to the server
            const formData = new FormData();
            formData.append('photo', postImage);
            formData.append('description', postDescription);
            formData.append('tags', postTags);

            const response = await fetch(`https://spotless-pullover-hen.cyclic.app/users/${userData.username}/add-post`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const addedPostData = await response.json();
                setAddedPost(addedPostData.data);
                // Clear the form fields after adding a new post
                setPostDescription('');
                setPostTags('');
                setPostImage(null);
                setShowAddPostForm(false);
            } else {
                console.error('Error adding post:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding post:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRandomPosts = async () => {
        try {
            const response = await fetch(`https://spotless-pullover-hen.cyclic.app/posts`);
            const data = await response.json();

            if (response.ok) {
                const shuffledPosts = data.data.sort(() => Math.random() - 0.5).slice(0, 3);
                setRandomPosts(shuffledPosts);
            }
        } catch (error) {
            console.error('Error fetching random posts:', error);
        }
    };

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center bg-dark text-light p-3">
                        <h1>Sociate</h1>
                        <div>
                            <p>{userData.username}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12">
                    <h1 className="mb-4">Search App</h1>
                    <SearchBar onSearch={handleSearch} />

                    {loading && <p>Loading...</p>}

                    <div className="mb-4">
                        {showAddPostForm && (
                            <div className="mb-3">
                                <h2>Add Post</h2>
                                <div className="mb-3">
                                    <label>Description:</label>
                                    <input type="text" className="form-control" value={postDescription} onChange={(e) => setPostDescription(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label>Tags:</label>
                                    <input type="text" className="form-control" value={postTags} onChange={(e) => setPostTags(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label>Image:</label>
                                    <input type="file" accept="image/*" className="form-control" onChange={(e) => setPostImage(e.target.files[0])} />
                                </div>
                                <button className="btn btn-primary" onClick={handleAddPost}>Add Post</button>
                            </div>
                        )}

                        {!showAddPostForm && (
                            <button className="btn btn-success" onClick={() => setShowAddPostForm(true)}>Add Post</button>
                        )}

                        {addedPost && (
                            <div className="mt-3">
                                <h2>Added Post:</h2>
                                <div className="mb-3">
                                    <p>{addedPost.description}</p>
                                    <img
                                        src={addedPost.download_url}
                                        alt="Added Post"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        )}

                        {searchResults.length > 0 && (
                            <div className="mt-4">
                                <h2>Search Results:</h2>
                                <div className="row">
                                    {searchResults.map((downloadUrl, index) => (
                                        <div key={index} className="col-12 col-md-4 mb-3">
                                            <img
                                                src={downloadUrl}
                                                alt={`Post ${index + 1}`}
                                                className="img-fluid"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {searchResults.length === 0 && !loading && <p>No results found.</p>}
                    </div>

                    {randomPosts.length > 0 && (
                        <div className="mt-4">
                            <h2>Random Posts:</h2>
                            <div className="row">
                                {randomPosts.map((post, index) => (
                                    <div key={index} className="col-12 col-md-4 mb-3">
                                        <p>{post.description}</p>
                                        <img
                                            src={post.download_url}
                                            alt={`Random Post ${index + 1}`}
                                            className="img-fluid"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Layout, message, Pagination, Spin } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 5;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/posts`);
      setAllPosts(response.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      message.error('Failed to fetch posts');
      setAllPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const sliceContentTo30Words = (htmlContent) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    const textContent = tempElement.textContent || tempElement.innerText || '';
    const words = textContent.split(' ').slice(0, 30).join(' ');
    return words + "...";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <Content className='mx-auto max-w-[670px] p-2 w-full mt-20 text-center'>
        <Spin tip="loading..." />
      </Content>
    );
  }

  return (
    <Content className='mx-auto max-w-[670px] p-2 w-full mt-20'>
      <h1 className='text-[#705C99] text-3xl font-bold underline'>All Posts</h1>
      {allPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {currentPosts.map((post) => (
            <div key={post._id} className="flex bg-white shadow-lg rounded-lg my-2 md:mx-auto p-2 w-full">
              <div className="flex items-start px-4 py-6 w-full">
                <div className="mt-4 w-full">
                  <Link to={`/post/${post._id}`}>
                    <h1 className="text-2xl font-bold text-dark-grey -mt-1 capitalize underline">
                      {post.title}
                    </h1>
                  </Link>
                  <p className="mt-3 text-grey text-xl md:text-left text-justify" dangerouslySetInnerHTML={{ __html: sliceContentTo30Words(post.content) }}>
                  </p>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='design'>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {allPosts.length > postsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            total={allPosts.length}
            pageSize={postsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </Content>
  );
};

export default AllPosts;
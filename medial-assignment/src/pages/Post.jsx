import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Layout, message } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/post/${id}`);
        setPost(response.data);
        if (response.data.url) {
          let metaTag = document.querySelector('meta[property="og:image"]');
          if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('property', 'og:image');
            document.head.appendChild(metaTag);
          }
          metaTag.setAttribute('content', response.data.url);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        message.error('Failed to fetch post');
      }
    };

    fetchPost();
  }, [id]);

  return (
    <Content style={{ padding: '50px' }} className='mx-auto max-w-[670px] p-2 w-full mt-20 '>
      {post ? (
        <div className='text-justify'>
          <div className='border p-3'>{post.url && <img src={post.url} alt={post.title} style={{ maxWidth: '100%' }} />}</div>
          <Title level={2} className='underline pt-3'>{post.title}</Title>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </Content>
  );
};

export default Post;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Layout, message } from 'antd';
import { Helmet } from 'react-helmet';

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
          <Helmet>
            <title>{post.title}</title>
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.content.slice(0, 150)} />
            <meta property="og:image" content={post.url} />
            <meta property="og:url" content={`${window.location.href}`} />
            <meta property="og:type" content="article" />
          </Helmet>
          <div className='border p-3'>
            {post.url && <img src={post.url} alt={post.title} style={{ maxWidth: '100%' }} />}
          </div>
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

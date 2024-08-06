import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Form, Input, Button, Layout, message } from 'antd';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Content } = Layout;

const CreatePost = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');

  const handleImageUpload = useCallback((file) => {
    return new Promise(async (resolve, reject) => {
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB > 50) {
        message.error('Image size should not exceed 50KB');
        reject('Image too large');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/upload-image`, formData);
        resolve(response.data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Failed to upload image');
        reject('Upload failed');
      }
    });
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };


  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'color',
    'background',
    'align',
    'size',
    'font'
  ];

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/create-post`, {
        title: values.title,
        content: content
      });
      message.success('Post created successfully!');
      form.resetFields();
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      message.error('The image should not exceed 50KB size. Failed to create post');
    }
  };

  return (
    <Content style={{ padding: '50px' }} className='mx-auto max-w-[670px]  p-2 w-full mt-20 '>
      <Form form={form} onFinish={handleSubmit} layout="vertical" style={{ zIndex: "-100" }}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input style={{ borderRadius: "0px", padding: "5px" }} />
        </Form.Item>
        <Form.Item label="Content" rules={[{ required: true, message: 'Please enter content' }]}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContent}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button
            className='flex gap-1 whitespace-nowrap justify-center px-6 py-5 rounded-[999px] text-zinc-50 bg-[#705C99]'
            htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
      <Button type="link">
        <Link to="/posts">View All Posts</Link>
      </Button>
    </Content>
  );
};

export default CreatePost;


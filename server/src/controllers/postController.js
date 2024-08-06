import Post from '../models/Post.js';
import { createOgImage } from '../services/imageService.js';
import { uploadToS3 } from '../services/s3Service.js';
import { convert } from 'html-to-text';
import { nanoid } from 'nanoid';

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const plainTextContent = convert(content, {
      wordwrap: 130,
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: 'a', options: { ignoreHref: true } }
      ]
    });

    const imgRegex = /<img.*?src="(.*?)".*?>/;
    const imgMatch = content.match(imgRegex);
    const firstImageUrl = imgMatch ? imgMatch[1] : null;

    const buffer = await createOgImage(title, plainTextContent, firstImageUrl);

    const fileName = `og-image-${nanoid()}.png`;
    const uploadResult = await uploadToS3(buffer, fileName);

    const newPost = new Post({
      url: uploadResult.Location,
      title,
      content
    });
    await newPost.save();

    res.json({ imageUrl: uploadResult.Location });
  } catch (error) {
    console.error('Error creating Post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch all posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch OG image' });
  }
};
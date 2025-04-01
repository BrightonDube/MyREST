import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
    const postsResponse = await fetch('https://myrest.onrender.com/posts/');
    if (!postsResponse.ok) {
      throw new Error(`HTTP error! status: ${postsResponse.status}`);
    }
    const posts = await postsResponse.json();
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Dashboard</title>
                <style>
                    body { font-family: sans-serif; margin: 20px; }
                    .post { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; }
                    .post-title { font-size: 1.2em; font-weight: bold; margin-bottom: 5px; }
                    .post-description { color: #555; }
                </style>
            </head>
            <body>
                <h1>Dashboard - Posts</h1>
                <div id="posts-container">
                    ${posts
                      .map(
                        (post) => `
                        <div class="post">
                            <h2 class="post-title">${post.title}</h2>
                            <p class="post-description">${post.description}</p>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            </body>
            </html>
        `);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts. Please try again later.');
  }
});

export default router;

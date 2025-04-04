// swagger.js
import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';

const endpointsFiles = ['./routes/posts.js', './routes/comments.js', './routes/authRoutes.js'];

const doc = {
  info: {
    title: 'My Post API Documentation',
    description: 'Documentation for my Express Post API with Google OAuth Authentication' 
  },
  host: 'myrest.onrender.com', 
  schemes: ['https'], 
  tags: [
    {
      name: 'Posts',
      description: 'Operations related to blog posts'
    },
    {
      name: 'Comments',
      description: 'Operations related to comments on blog posts'
    },
    {
      name: 'Authentication', 
      description: 'Google OAuth Authentication Routes'
    },
     {
      name: 'General', 
      description: 'General API information'
    }
  ],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token (session-based authentication)' 
    }
  },
  definitions: {
    PostInput: {
      title: 'Example Post Title',
      description: 'Example post description'
    },
    PostUpdateInput: {
      title: 'Updated Title (optional)',
      description: 'Updated description (optional)'
    },
    Post: {
      _id: '65f...',
      title: 'Post Title',
      description: 'Post Description',
      date: '2024-03-15T12:00:00.000Z',
      __v: 0
    },
    CommentInput: {
      text: 'This is a comment text',
      author: 'Comment Author Name'
    },
    CommentUpdateInput: {
      text: 'Updated comment text (optional)',
      author: 'Updated Author Name (optional)'
    },
    Comment: {
      _id: '660...',
      text: 'Comment Text',
      author: 'Author Name',
      postId: '65f...',
      date: '2024-03-22T10:00:00.000Z'
    },
    Error: {
      message: 'Error message string'
    },
    ValidationError: {
      errors: [
        {
          msg: 'Validation error message',
          param: 'fieldName',
          location: 'body'
        }
      ]
    },
    NotFoundError: {
      message: 'Resource not found'
    },
     DashboardResponse: { 
        message: 'Welcome to the API',
        user: {
          type: 'object', 
          description: 'User profile object from Google OAuth'
        }
      }
  },
   security: [], 
};

swaggerAutogen(outputFile, endpointsFiles, doc);
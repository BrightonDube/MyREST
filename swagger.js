// swagger.js
import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json'; // Output file for Swagger documentation
const endpointsFiles = ['./index.js'];      // Path to your route file (adjust if needed, e.g., './routes/posts.js')

const doc = {
    info: {
        title: 'My Post API Documentation', // Customize your API title
        description: 'Documentation for my Express Post API with validation using express-validator', // Customize your API description
    },
    host: 'localhost:3000', // Your API host and port (adjust if needed)
    schemes: ['http'],       // or ['https'] if you are using HTTPS
    tags: [                 // Optional: Define tags for your API documentation
        {
            name: 'Posts',
            description: 'Operations related to blog posts'
        }
        // You can add more tags here if you have other resource categories
    ],
    definitions: {          // Optional: Define reusable data models (like your PostInput and PostUpdateInput)
        PostInput: {
            title: 'Example Post Title',        // Example value for title
            description: 'Example post description' // Example value for description
            // You can add more properties here if needed based on your PostInput @typedef
        },
        PostUpdateInput: {
            title: 'Updated Title (optional)', // Example optional title
            description: 'Updated description (optional)' // Example optional description
            // You can add more optional properties here based on your PostUpdateInput @typedef
        },
        Post: {              // Example definition for a Post object (if you want to explicitly define it)
            _id: '65f...',    // Example ID (replace with a realistic example or leave as placeholder)
            title: 'Post Title',
            description: 'Post Description',
            date: '2024-03-15T12:00:00.000Z', // Example date in ISO format
            __v: 0             // Example version key
        },
        Error: {              // Example definition for a generic error response
            message: 'Error message string'
        },
        ValidationError: {    // Example definition for validation error response
            errors: [
                {
                    msg: 'Validation error message',
                    param: 'fieldName',
                    location: 'body'
                }
            ]
        },
        NotFoundError: {      // Example definition for Not Found error response
            message: 'Resource not found'
        }
        // Add more definitions as needed for your API responses and request bodies
    },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
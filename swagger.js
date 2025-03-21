// swagger.js
import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json'; 
const endpointsFiles = ['./routes/posts.js'];      

const doc = {
    info: {
        title: 'My Post API Documentation', 
        description: 'Documentation for my Express Post API with validation using express-validator', 
    },
    host: 'myrest.onrender.com', 
    schemes: ['https'],       
    tags: [                 
        {
            name: 'Posts',
            description: 'Operations related to blog posts'
        }
        
    ],
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
        }
       },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
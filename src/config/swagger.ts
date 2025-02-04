import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API operations for products in the store"
            }
        ],
        info: {
            title: 'Rest API Node.Js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },

    apis: ["./src/routes.ts"]
}


const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
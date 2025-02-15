import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Products",
        description: "API operations for products in the store",
      },
    ],
    info: {
      title: "Rest API Node.Js / Express / Typescript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },

  apis: ["./src/routes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
        content: url('https://bhdouglass.com/images/blog/logos/nodejs-logo.svg');
        height: 80px;
        width: auto;
    }
    `,

    customSiteTitle: 'Documentacion Rest API Express / TypeScript'
};

export default swaggerSpec;
export { swaggerUiOptions };

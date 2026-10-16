const errorResponse = {
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/ErrorResponse" },
    },
  },
};

export const openapiSpec = {
  openapi: "1.0.0",
  info: {
    title: "Gemini Chat API",
    version: "1.0.0",
    description:
      "A small API that sends a message to Google Gemini and returns the reply.",
  },
  paths: {
    "/chat": {
      post: {
        summary: "Send a message to Gemini",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["message"],
                properties: {
                  message: {
                    type: "string",
                    minLength: 1,
                    maxLength: 2000,
                    example: "Hello, who are you?",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Gemini's reply",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { reply: { type: "string" } },
                },
              },
            },
          },
          "400": {
            description:
              "Invalid message (not a string, empty, or longer than 2000 characters)",
            ...errorResponse,
          },
          "500": { description: "Internal server error", ...errorResponse },
          "502": { description: "Gemini returned an empty reply", ...errorResponse },
        },
      },
    },
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "Server is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { status: { type: "string", example: "ok" } },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: { message: { type: "string" } },
          },
        },
      },
    },
  },
};
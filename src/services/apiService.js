import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export const apiService = {
  fetchMessages: async () => {
    try {
      const query = `
        query ListMessages {
          listMessages {
            id
            name
            email
            content
            createdAt
          }
        }
      `;
      const response = await client.graphql({ query });
      return response.data.listMessages || [];
    } catch (error) {
      console.error("GraphQL Fetch Error:", error);
      return [];
    }
  },

  deleteMessage: async (id) => {
    try {
      const mutation = `
        mutation DeleteMessage($id: ID!) {
          deleteMessage(id: $id) {
            id
          }
        }
      `;
      return await client.graphql({
        query: mutation,
        variables: { id }
      });
    } catch (error) {
      console.error("GraphQL Delete Error:", error);
      throw error;
    }
  },

  subscribeToMessages: (callback) => {
    const subscription = `
      subscription OnCreateMessage {
        onCreateMessage {
          id
          name
          content
          createdAt
        }
      }
    `;

    return client.graphql({ query: subscription }).subscribe({
      next: ({ data }) => {
        if (data.onCreateMessage) {
          callback(data.onCreateMessage);
        }
      },
      error: (err) => console.error("Subscription Link Broken:", err)
    });
  }
};
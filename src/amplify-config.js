import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      loginWith: { email: true }
    }
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_APPSYNC_URL,
      region: 'ap-southeast-1',
      defaultAuthMode: 'apiKey',
      apiKey: import.meta.env.VITE_APPSYNC_API_KEY
    }
  }
});

export const nexusTheme = {
  name: 'nexus-theme',
  tokens: {
    colors: {
      font: { primary: { value: '#ffffff' } },
      brand: { primary: { 80: { value: '#22d3ee' } } },
    },
    components: {
      authenticator: {
        router: {
          backgroundColor: { value: 'rgba(2, 6, 23, 0.85)' },
          borderWidth: { value: '1px' },
          borderColor: { value: 'rgba(255, 255, 255, 0.1)' },
        },
      },
    },
  },
};
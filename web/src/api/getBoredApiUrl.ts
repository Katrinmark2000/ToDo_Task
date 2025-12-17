export const getBoredApiUrl = () => {
    if (import.meta.env.DEV) {
      return '/api/bored/random'; //dev
    }
    return 'https://my-cors-proxy-eight.vercel.app/api/random';
  };
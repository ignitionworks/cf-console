This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Deployment

```bash
cp env.example .env.local
# modify .env.local to have NEXT_PUBLIC_API_URL point to the url of this application

# ensure all the environment variables are set in the manifest
eg:
cat manifest.yml
    CF_API_HOST: https://cf-api.cloud.ignition.works (the api URL)
    UAA_HOST: https://uaa.cloud.ignition.works (the UAA URL)
    UAA_CLIENT_ID: {clientID} (this client secret)
    UAA_CLIENT_SECRET: {clientSecret} (this client id)
    NEXTAUTH_SECRET: {random} (openssl rand -base64 32)} 
    NEXTAUTH_URL: https://cf-console.cloud.ignition.work {this URL}
    
npm run build
cf push
```



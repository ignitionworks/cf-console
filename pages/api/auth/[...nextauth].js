import NextAuth from 'next-auth'

const uaaHost = process.env.UAA_HOST
const uaaClientId = process.env.UAA_CLIENT_ID
const uaaSecret = process.env.UAA_CLIENT_SECRET

export default async function auth(req, res) {
  const providers = [
    {
      id: 'uua',
      name: 'Uaa',
      type: 'oauth',
      clientId: uaaClientId,
      clientSecret: uaaSecret,
      wellKnown: `${uaaHost}/.well-known/openid-configuration`,
      authorization: {
        url: `${uaaHost}/oauth/authorize`,
        params: {
          scope: 'openid cloud_controller_service_permissions.read cloud_controller.read routing.router_groups.read'
        },
      },
      profile(profile) {
        return {
          id: profile.user_id,
          name: profile.user_name,
          email: profile.email,
        }
      },
    }
  ]

  const callbacks = {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token}) {
      session.accessToken = token.accessToken
      return session
    }
  }

  return await NextAuth(req, res, {
    providers,
    callbacks
  })
}

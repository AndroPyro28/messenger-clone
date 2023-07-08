import {withAuth} from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: '/',
    },
    callbacks: {
       async authorized({token}) {
        // we can authorize the client here
        // we can call or setup the app here
        return Boolean(token?.sub)
        },
    }
})

export const config  = {
    matcher: [
        '/users/:path*',
    ]
}

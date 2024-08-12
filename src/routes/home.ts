import { Route } from '../router.ts'

interface HomeRoute extends Route {
    path: '/'
}

export const homeRoute: HomeRoute = {
    path: '/',
    method: 'GET',
    handler: (req: Request) => {
        return new Response('', { status: 200 })
    },
}

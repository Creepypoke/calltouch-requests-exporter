import { Route } from '../router.ts'

interface HealthCheckRoute extends Route {
    path: '/healthcheck'
    method: 'GET'
}

export const healthCheckRoute: HealthCheckRoute = {
    path: '/healthcheck',
    method: 'GET',
    handler: (_: Request) => {
        return new Response('OK', {
            status: 200,
            headers: { 'Content-Type': 'text/plain; charset=UTF=8' },
        })
    },
}

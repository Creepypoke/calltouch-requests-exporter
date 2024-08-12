import { Router } from './router.ts'
import { healthCheckRoute } from './routes/healthCheck.ts'
import { homeRoute } from './routes/home.ts'
import { importRequestsRoute } from './routes/import-requests.ts'

export const requestHandler = async (request: Request) => {
    try {
        return await Router(request, [
            healthCheckRoute,
            homeRoute,
            importRequestsRoute,
        ])
    } catch (error) {
        console.error('[ERROR]', error)
        return new Response(JSON.stringify(error, null, 2))
    }
}

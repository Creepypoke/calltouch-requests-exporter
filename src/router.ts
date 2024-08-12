import appConfig from './config.ts'

export interface Route {
    path: string
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
    handler: (
        req: Request,
    ) => Response | Promise<Response>
}

export function Router(req: Request, routes: Route[]) {
    const requestURL = new URL(req.url)
    const exactRoute = routes.find((route: Route) =>
        requestURL.pathname === route.path && req.method === route.method
    )

    if (!exactRoute) {
        if (appConfig.log_level === 'debug') {
            console.error('[ERROR]', 'Request data:', {
                method: req.method,
                url: req.url,
                body: req.body,
            })
        }
        throw new Error(
            `Route handler to request path: '${requestURL.pathname}' is not found`,
        )
    }

    if (appConfig.log_level === 'debug') {
        console.log(
            `[DEBUG] [${req.method}] ${req.url} is matched to '${exactRoute.path}'`,
        )
    }

    return exactRoute.handler(req)
}

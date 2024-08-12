import appConfig from './config.ts'
import { requestHandler } from './requestHandler.ts'

const ac = new AbortController()

const { port, host } = appConfig

Deno.cron('Simple log message', '* * * * *', () => {
    console.log('This will print once a minute.')
})

try {
    const server = Deno.serve(
        { port, hostname: host, signal: ac.signal },
        requestHandler,
    )
    console.log(`[INFO] Server is started with config:`, appConfig)

    try {
        await server.finished
        console.log('Closing server...')
        ac.abort()
    } catch (error) {
        console.error('[ERROR]', error)
    }
} catch (error) {
    console.error('[ERROR]', 'Inner server Error', error)
}

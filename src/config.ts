import { parseArgs } from '$std/cli/parse_args.ts'

const CALLTOUCH_API_TOKEN = Deno.env.get('CALLTOUCH_API_TOKEN')
const PORT = Number(Deno.env.get('PORT') ?? 8000)
const HOST = String(Deno.env.get('HOST') ?? '0.0.0.0')

const args = parseArgs(Deno.args, {
    string: ['log-level'],
    boolean: ['dev'],
    default: {
        'log-level': 'debug',
        'dev': false,
    },
})

if (typeof CALLTOUCH_API_TOKEN === 'undefined') {
    throw new Error('CALLTOUCH_API_TOKEN must be defined')
}

export default {
    host: HOST,
    port: PORT,
    calltouchApiToken: CALLTOUCH_API_TOKEN,
    log_level: args['log-level'],
    dev: args['dev'],
}

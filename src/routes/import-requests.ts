import { multiParser } from 'https://deno.land/x/multiparser@0.114.0/mod.ts'
import type { FormFile } from 'https://deno.land/x/multiparser@0.114.0/mod.ts'

import { Route } from '../router.ts'
import appConfig from '../config.ts'
import { RequestsFile } from '../model/RequestFile/RequestsFile.ts'
import { CalltouchRequest } from '../model/CalltouchRequest.ts'
import { SITE_ID } from '../constants.ts'

interface ImportRequestsRoute extends Route {
    path: '/import-requests'
    method: 'POST'
}

export const importRequestsRoute: ImportRequestsRoute = {
    path: '/import-requests',
    method: 'POST',
    handler: async (req: Request) => {
        if (appConfig.log_level === 'debug') {
            console.log(
                `[DEBUG] ${JSON.stringify(req.body)} ${
                    JSON.stringify(req.headers)
                }`,
            )
        }

        if (!req.body) {
            throw new Error('Body is missing')
        }

        if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
            if (appConfig.log_level === 'debug') {
                console.error(
                    `[DEBUG] header Content-Type has value ${
                        req.headers.get('Content-Type')
                    }`,
                )
            }
            throw new Error('Content-Type header must be "multipart/form-data"')
        }

        try {
            const form = await multiParser(req)
            const fileData = form?.files['requests-file'] as FormFile

            const textDecoder = new TextDecoder()
            const res = textDecoder.decode(
                fileData.content,
            )

            const x = new RequestsFile(res)
            const requests = x.getData().map((y) => {
                const q = new CalltouchRequest({
                    id: y.id,
                    requestDate: y.sent,
                    fio: y.fio,
                    phoneNumber: y.phoneNumber,
                    manager: y.manager,
                    source: y.source,
                    medium: y.medium,
                    formName: y.formName,
                    comment: y.rating
                        ? `Рейтинг заявки: ${y.rating}`
                        : undefined,
                    tag: y.tag,
                })
                return q.toRequest()
            })

            let calltouchResponse: Response | { body: string } = {
                body: JSON.stringify({ requests }),
            }

            if (!appConfig.dev) {
                calltouchResponse = await fetch(
                    'https://api.calltouch.ru/lead-service/v1/api/request/create',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Token': appConfig.calltouchApiToken,
                            'SiteId': SITE_ID,
                        },
                        body: JSON.stringify({ requests }),
                    },
                )
            }

            return new Response(calltouchResponse.body, {
                status: 200,
                headers: { 'Content-Type': 'application/json; charset=UTF=8' },
            })
        } catch (error) {
            console.error(error)
            return new Response(error.message, {
                status: 500,
                headers: { 'Content-Type': 'application/json; charset=UTF=8' },
            })
        }
    },
}

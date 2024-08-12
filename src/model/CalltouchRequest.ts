import { format } from '$std/datetime/format.ts'

interface IData {
    id: string
    requestDate: Date
    fio: string
    phoneNumber: string
    manager: string
    source: string
    medium: string
    formName?: string
    comment?: string
    tag?: string
}

interface CalltouchRequestBody {
    requestNumber: string
    subject: string
    manager: string
    requestUrl?: string
    requestDate: string
    phoneNumber?: string
    email?: string
    fio: string
    comment?: {
        text: string
    }
    addTags?: Record<'tag', string>[]
    customSources?: {
        source: string
        medium: string
        campaign: string
        content?: string
    }
}

export class CalltouchRequest {
    private readonly rawData: IData | null = null

    constructor(rawData: IData) {
        this.rawData = {
            id: rawData.id,
            requestDate: new Date(rawData.requestDate),
            fio: rawData.fio,
            phoneNumber: rawData.phoneNumber,
            manager: rawData.manager,
            source: rawData.source,
            medium: rawData.medium,
            formName: rawData.formName ?? 'offline',
            comment: rawData.comment ?? '',
            tag: rawData.tag ?? '',
        }
    }

    private isEmpty() {
        return this.rawData === null
    }

    toRequest() {
        if (this.rawData === null) {
            throw new Error(
                "Can't represent Calltouch Request as JSON. Data is null",
            )
        }

        const tags: Record<'tag', string>[] = [
            { tag: 'Тест' },
        ]

        if (this.rawData.tag) {
            tags.push({ tag: this.rawData.tag })
        }

        const body: CalltouchRequestBody = {
            requestNumber: this.rawData.id,
            manager: this.rawData.manager,
            subject: this.rawData.formName ?? 'offline',
            requestUrl: 'https://svoi.house/crm',
            requestDate: format(
                this.rawData.requestDate,
                'dd-MM-yyyy hh:mm:ss',
            ),
            phoneNumber: this.rawData.phoneNumber,
            fio: this.rawData.fio,
            addTags: tags,
            customSources: {
                source: this.rawData.source,
                medium: this.rawData.medium,
                campaign: this.rawData.source,
            },
        }

        if (this.rawData.comment) {
            body.comment = {
                text: this.rawData.comment,
            }
        }

        return body
    }
}

/*
const body = {
    requests: [
        {
            'requestNumber': Math.random().toString().split('.')[1],
            'subject': 'Тестовая форма заявки',
            'requestUrl': 'https://svoi.house/crm',
            'requestDate': format(
                new Date(),
                'dd-mm-yyyy hh:mm:ss',
            ),
            'phoneNumber': '+79990001122',
            'email': 'testUser@example.com',
            'fio': 'Иванова Ивана Тестовна',
            'comment': {
                'text': 'Тестовая заявка',
            },
            'addTags': [
                { 'tag': 'Тест' },
            ],
            'customSources': {
                'source': 'etagi',
                'medium': 'agent',
            },
        },
    ],
}

const calltouchResponse = await fetch(
    'https://api.calltouch.ru/lead-service/v1/api/request/create',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Token': CALLTOUCH_API_TOKEN,
            'SiteId': SITE_ID,
        },
        body: JSON.stringify(body),
    },
)
*/

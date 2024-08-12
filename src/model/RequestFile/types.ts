export interface ITableRow {
    id: string
    manager: string
    fio: string
    phoneNumber: string
    source: string
    medium: string
    rating: number
    sent: Date
    formName: string
    tag: string
}

export interface RawTableRow {
    manager: string
    phone: string
    name: string
    tags: string
    raiting: string
    source: string
    medium: string
    referer: string
    formid: string
    'Название формы': string
    sent: string
    requestid: string
}

export type RawColumnsName = keyof RawTableRow

import { TableRowSchema } from './schema.z.ts'
import { ITableRow, RawColumnsName, RawTableRow } from './types.ts'

interface IRequestsFile {
    rawData?: string
    data?: ITableRow[]
    getData: () => ITableRow[] | undefined
}

export class RequestsFile implements IRequestsFile {
    data
    rawData

    constructor(fileText: string) {
        this.rawData = fileText
        this.data = this.parse(fileText)
    }

    private parse(res: string): ITableRow[] {
        const separator = ','
        return res.split('\n').reduce<ITableRow[]>(
            (acc, row, index, orig) => {
                if (index === 0) {
                    return []
                }

                const columnNames = orig[0].split(separator)

                const handledRow = Object.fromEntries(
                    row.split(separator).map((
                        v,
                        i,
                    ) => [columnNames[i].trim(), v.trim()]),
                )

                const transformed = this.fromRawRow(handledRow)

                return [...acc, transformed]
            },
            [],
        )
    }

    private fromRawRow(
        r: {
            [x: string]: string // @FIXME
        },
    ): ITableRow {
        try {
            const id = r.requestid.length > 0
                ? r.requestid
                : `${
                    r.phone?.replace(/\s/g, '')
                }_${r.name}_${crypto.randomUUID()}`

            return TableRowSchema.parse({
                id,
                manager: r.manager,
                fio: r.name,
                phoneNumber: r.phone,
                source: r.source,
                medium: r.medium,
                rating: Number(r.raiting),
                sent: new Date(r.sent),
                formName: r['Название формы'],
                tag: r.tags,
            })
        } catch (err) {
            throw err
        }
    }

    getData() {
        return this.data
    }
}

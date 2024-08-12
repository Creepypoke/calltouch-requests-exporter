import { z, ZodObject } from 'https://deno.land/x/zod@v3.23.8/mod.ts'

export const TableRowSchema = z.object({
    id: z.string(),
    manager: z.string(),
    fio: z.string(),
    phoneNumber: z.string(),
    source: z.string(),
    medium: z.string(),
    rating: z.coerce.number(),
    sent: z.coerce.date(),
    tag: z.string(),
    formName: z.string(),
})
//   .required().superRefine((val, ctx) => {
//     if (
//         (val.source === 'etagi' || val.source === 'pan') &&
//         val.medium !== 'agent'
//     ) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: `Wrong medium: ${val.medium} for source: ${val.source}`,
//         })
//     }
//
//     if (
//         typeof val.source === 'string' &&
//         ['whatsapp', 'telegram', 'vk'].includes(val.source) &&
//         val.medium !== 'social'
//     ) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: `Wrong medium: ${val.medium} for source: ${val.source}`,
//         })
//     }
//
//     if (val.source === 'avito' && val.medium !== 'avito') {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: `Wrong medium: ${val.medium} for source: ${val.source}`,
//         })
//     }
//
//     if (val.source === 'other' && val.medium !== 'other') {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: `Wrong medium: ${val.medium} for source: ${val.source}`,
//         })
//     }
// })

export const CalltouchRequestSchema = z.object({
    manager: z.string(),
    phone: z.string(),
    name: z.string(),
    tags: z.string(),
    raiting: z.coerce.string(),
    source: z.string(), // @TODO добавить енум и проверку medium от source
    medium: z.string(),
    referer: z.string().url(),
    formid: z.string(),
    'Название формы': z.string(),
    sent: z.coerce.date(),
    requestid: z.string(),
})

import { IFormData } from "~/types"

export default defineEventHandler(async (event) => {
    try {
        const body: IFormData | null = await readBody(event)
        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        // const keys = useStorage().getKeys() - Get list of all keys available to your app.
        const source = await useStorage().getItem('root:assets:email-templates:verification.html')
        const emailHeading: { to: string, subject: string } = {
            to: body.email,
            subject: body.subject
        }
        const emailBody: { name: string, body: string } = {
            name: body.name,
            body: body.body
        }
        if (source) {
            await sendEmail({ source: source as string, head: emailHeading, body: emailBody })
        }
        return 200 // Success
    } catch (error: unknown) {
        console.log(error)
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
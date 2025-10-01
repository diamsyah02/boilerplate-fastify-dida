export const success: number = 200
export const created: number = 201
export const noContent: number = 204
export const badRequest: number = 400
export const notFound: number = 404
export const unprocessableEntity: number = 422
export const internalServerError: number = 500

export const WebResponse = (statusCode: number, message: string, data: any) => {
    return {
        statusCode: statusCode,
        message: message,
        data: data
    }
}
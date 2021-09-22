interface IError {
    msg: string
}

export interface IErrorBody {
    errors: IError[]
}

class CustomError extends Error {
    message: string
    code?: number

    constructor(message: string) {
        super(message)

        this.message = message
    }

    get body(): IErrorBody {
        return {
            errors: [{ msg: this.message }],
        }
    }

    businessException = (): this => {
        this.code = 422

        return this
    }

    accessDenied = (): this => {
        this.code = 401

        return this
    }

    conflict = (): this => {
        this.code = 409

        return this
    }
}

export default CustomError

import { NodePlopAPI } from 'plop'

import {
    actions as createRouteActions,
    prompts as creatRoutePrompts,
} from './plop/generators/createRoute'
import {
    name as capitalCaseHelperName,
    helperFunction as capitalCaseHelperFunction,
} from './plop/helpers/capitalCase'

export type TAction = `createRoute`

export interface IPlopData {
    action?: TAction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

const promptsTo = [...creatRoutePrompts]

const actionsTo = {
    createRoute: createRouteActions,
}

export default function (plop: NodePlopAPI): void {
    plop.setHelper(capitalCaseHelperName, capitalCaseHelperFunction)

    plop.setGenerator(`controller`, {
        description: `Plop generator controller`,
        prompts: [
            {
                type: `list`,
                name: `action`,
                message: `Want create a:`,
                choices: [{ name: `Route`, value: `createRoute` }],
            },
            ...promptsTo,
        ],
        actions: (data: IPlopData) => {
            if (!data) return

            const actionRequired = data.action

            const fn = actionsTo[actionRequired]

            return fn(data)
        },
    })
}

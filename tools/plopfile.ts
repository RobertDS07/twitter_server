import { NodePlopAPI } from 'plop'

import {
    capitalCaseName,
    snakeCaseName,
    toCapitalCase,
    toSnakeCasel,
} from './helpers'

import {
    createEntityActions,
    createEntityPrompts,
    createRouteActions,
    createRoutePrompts,
} from './generators'

const promptsTo = [...createRoutePrompts, ...createEntityPrompts]

const actionsTo = {
    createRoute: createRouteActions,
    createEntity: createEntityActions,
}

export default function (plop: NodePlopAPI): void {
    plop.setHelper(capitalCaseName, toCapitalCase)
    plop.setHelper(snakeCaseName, toSnakeCasel)

    plop.setGenerator(`controller`, {
        description: `Plop generator controller`,
        prompts: [
            {
                type: `list`,
                name: `action`,
                message: `Want create a:`,
                choices: [
                    { name: `Route`, value: `createRoute` },
                    { name: `Entity`, value: `createEntity` },
                ],
            },
            ...promptsTo,
        ],
        actions: data => {
            if (!data) return

            const actionRequired = data.action

            const fn = actionsTo[actionRequired]

            return fn(data)
        },
    })
}

import { helperFunction as toSnakeCase } from '../helpers/snakeCase'

import { getTimestampsToMigrationName } from './utils/generators'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const prompts = [
    {
        type: `input`,
        name: `entityName`,
        message: `Entity Name: (camelCase)`,
        when: data => data.action === `createEntity`,
    },
]

export const actions = data => {
    const timestamps = getTimestampsToMigrationName()

    const snakeCaseName = toSnakeCase(data.entityName)

    const actionToAddMigration = {
        type: `add`,
        path: `database/migrations/${timestamps}-${snakeCaseName}.js`,
        templateFile: `templates/migrations/indexTemplate.hbs`,
    }

    const actionToAddModel = {
        type: `add`,
        path: `src/models/${data.entityName}.ts`,
        templateFile: `templates/models/indexTemplate.hbs`,
    }

    const actions = [actionToAddMigration, actionToAddModel]

    return actions
}

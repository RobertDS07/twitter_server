/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { routePathFormater } from './utils/formaters'

export const prompts = [
    {
        type: `confirm`,
        name: `isPrivateRoute`,
        message: `Is private Route?`,
        when: data => data.action === `createRoute`,
    },
    {
        type: `input`,
        name: `routePath`,
        message: `Route Path:`,
        filter: routePathFormater,
        when: data => data.action === `createRoute`,
    },
    {
        type: `input`,
        name: `routeName`,
        message: `Route Name:`,
        when: data => data.action === `createRoute`,
    },
]

export const actions = data => {
    const isPrivateRoute = data.isPrivateRoute === true

    const folderToSave = isPrivateRoute ? `private` : `public`

    const actionToAddController = {
        type: `add`,
        path: `src/routes/${folderToSave}/${data.routeName}/${data.routeName}Controller.ts`,
        templateFile: `plop/templates/routes/controllerTemplate.hbs`,
    }

    const actionToAddMiddlewares = {
        type: `add`,
        path: `src/routes/${folderToSave}/${data.routeName}/${data.routeName}Middlewares.ts`,
        templateFile: `plop/templates/routes/middlewaresTemplate.hbs`,
    }

    const actionToAddIndex = {
        type: `add`,
        path: `src/routes/${folderToSave}/${data.routeName}/index.ts`,
        templateFile: `plop/templates/routes/indexTemplate.hbs`,
    }

    const actions = [
        actionToAddController,
        actionToAddMiddlewares,
        actionToAddIndex,
    ]

    return actions
}

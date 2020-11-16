import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { print, buildSchema } from 'graphql'
import path from 'path'

const schemasArry = loadFilesSync(
    path.join(__dirname, 'modules', '**', 'schema.*'),
)

const mergedSchemas = mergeTypeDefs(schemasArry)
const printedSchemas = print(mergedSchemas)
const schema = buildSchema(printedSchemas)

export default schema

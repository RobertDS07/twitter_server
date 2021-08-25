import moment from 'moment'

export const getTimestampsToMigrationName = (): string => {
    return moment().utc().format(`YYYYMMDDHHmmss`)
}

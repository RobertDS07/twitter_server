/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

import { Sequelize } from 'sequelize'

const env = process.env.NODE_ENV || `development`
const config = require(`${__dirname}/../configs/database.js`)[env]

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
)

export default sequelize

const commons = {
    query: {
        raw: true,
        nest: true,
    },
    define: {
        timestamps: true,
        underscored: true,
        deletedAt: true,
        freezeTableName: true,
        paranoid: true,
    },
}

module.exports = {
    development: {
        username: `dev`,
        password: `dev`,
        database: `tt`,
        host: `localhost`,
        dialect: `postgres`,
        port: 5432,
        ...commons,
    },
    test: {
        dialect: `sqlite`,
        storage: `__tests__/database.sqlite`,
        logging: () => null,
        transactionType: `IMMEDIATE`,
        ...commons,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: `postgres`,
        port: 5432,
        ...commons,
    },
}

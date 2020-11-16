module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'ttClone',
    logging: false,
    define: {
        timestamps: true,
    },
}

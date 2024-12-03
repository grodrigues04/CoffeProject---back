module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1', 
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || '123',
            database: process.env.DB_NAME || 'BalleCofe',
        },
    },
};
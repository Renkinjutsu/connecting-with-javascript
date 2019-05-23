const settings = require('./settings')
const knex = require('knex') ({
    client: 'pg',
    connection: {
        host: settings.hostname,
        user: settings.user,
        password : settings.password,
        database : settings.database,
        port     : settings.port,
        ssl      : settings.ssl
    }
}) 

knex.
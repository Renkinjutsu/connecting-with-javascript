let people = process.argv[2]
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

knex.from('famous_people').select('*').where('first_name', '=', `${people}`)
    .then((rows) => {
        console.log('Searching ...')
        console.log(`Found ${rows.length} person(s) by the name '${people}':`)
        for (let i = 0; i < rows.length; i++) {
            console.log(`-${i}: ${rows[i].first_name} ${rows[i].last_name}, born '${rows[i].birthdate}'`)
        }
    })
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });
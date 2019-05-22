let people = process.argv.slice(2)
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

knex.insert({first_name: `${people[0]}`, last_name: `${people[1]}`, birthdate: people[2]}).into('famous_people')
    .then(function (results) {
        console.log('Data inserted')
    })
    .catch((err) => {
        console.log(err);
        throw err
    })
    .then(() => {
        knex.from('famous_people').select('*')
        .then((results) => {
            console.log(results)
        })
    })
    .finally(() => {knex.destroy()})

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let people = process.argv[2]

const search = (err, result) => {
    console.log('Searching ...')
    if (err) {
        return console.error("error running query", err);
    } 
    console.log(`Found ${result.rowCount} person(s) by the name '${people}':`)
        for (let i = 0; i < result.rows.length; i++) {
            console.log(`-${i}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate}'`)
        }
}

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query(`SELECT * FROM famous_people WHERE first_name = '${people}'`, (err, result) => {
        search(err, result);
        client.end()
    });
});
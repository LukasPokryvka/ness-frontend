const knex = require('knex')

/*
 * vytvorenie spojenia s databazou
 * export na dalsie pouzitie
 */
const connectedKnex = knex({
	client: 'sqlite3',
	connection: {
		filename: 'todos.sqlite3'
	}
})

module.exports = connectedKnex

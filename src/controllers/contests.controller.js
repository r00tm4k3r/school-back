const db = require('../config/database')
const boom = require('boom')
const { query } = require('../config/database')

module.exports = {
    async getContests (_, res) {
        const query = `SELECT c.ContestId, c.ContestName, c.DateStart, c.DateEnd
        FROM Contests c
        WHERE c.Deleted = false`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },

    async deleteContest ({params: {id}}, res) {
        const query = `UPDATE Contests SET Deleted = true WHERE ContestId = ${id}`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}
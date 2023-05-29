const db = require('../config/database')
const boom = require('boom')
const { query } = require('../config/database')

module.exports = {
    async getCoaches (_, res) {
        const query = `SELECT c.CoachId, c.FullName, g.GenderName, c.Phone
        FROM Coaches c 
        JOIN Genders g ON c.GenderId = g.GenderId
        WHERE c.Deleted = 0 
        ORDER BY c.CoachId`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },

    async deleteCoach({params:{id}}, res) {
        const query = `UPDATE Coaches SET Deleted = true WHERE CoachId = ${id}`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}
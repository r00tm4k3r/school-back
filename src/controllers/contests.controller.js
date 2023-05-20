const db = require('../config/database')
const boom = require('boom')
const { query } = require('../config/database')

module.exports = {
    async getContests (_, res) {
        const query = `SELECT c.ContestName, c.ContestDate, s.SectionName, g.GenderName, sp.FullName, sp.Category
        FROM Contests c
        JOIN Sections s ON c.SectionId = s.SectionId 
        JOIN Genders g ON g.GenderId = s.SectionGenderId 
        JOIN ContestSportsmans cs ON cs.ContestId = c.ContestId 
        JOIN Sportsmans sp ON sp.SportsmanId = cs.SportsmanId
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
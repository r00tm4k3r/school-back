const db = require('../config/database')
const boom = require('boom')
const { query } = require('../config/database')

module.exports = {
    async getCoaches (_, res) {
        const query = `SELECT c.FullName, g.GenderName, c.Phone, s.SectionName, (SELECT g2.GenderName FROM Genders g2 WHERE s.SectionGenderId = g2.GenderId) as 'section gender'
        FROM Coaches c 
        JOIN Genders g ON c.GenderId = g.GenderId
        JOIN SectionGroups sg ON sg.CoachId = c.CoachId 
        JOIN Sections s ON sg.SectionId = s.SectionId
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
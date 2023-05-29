const db = require('../config/database')
const boom = require('boom')

module.exports = {
    async getSportsmans (_, res) {
        const query = `SELECT s.SportsmanId, s.FullName, s.Age, Genders.GenderName, s.Category, s.Phone, s.Address
        FROM Sportsmans s JOIN Genders ON s.GenderId = Genders.GenderId
        WHERE s.Deleted = false ORDER BY s.SportsmanId`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },

    async deleteSportsman({params:{id}}, res) {
        const query = `UPDATE Sportsmans SET Deleted = true WHERE SportsmanId = ${id}`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },

    async updateSportsman({params:{id}, body}, res) {
        let query = `UPDATE Sportsmans SET `
        Object.keys(body).forEach((k) => {
            const pattern = /^\d+\.?\d*$/
            if (pattern.test(body[k])) {
                query += `${k} = ${body[k]}, `
            }
            else {
                query += `${k} = '${body[k]}', `
            }
        })
        query = query.slice(0, -2)
        query += ` WHERE SportsmanId = ${id}`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },

    async createSportsman({body}, res) {
        let query = `INSERT INTO Sportsmans (FullName, GenderId, Age, Phone, Address, Category)
                VALUES ('${body.FullName}', ${body.GenderId}, ${body.Age}, '${body.Phone}', '${body.Address}', ${body.Category})`
        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}
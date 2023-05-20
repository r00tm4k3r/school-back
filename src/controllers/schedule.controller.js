const db = require('../config/database')
const boom = require('boom')

module.exports = {
    async getSchedules (_, res) {
        query = `SELECT s.ScheduleId, s.TrainDate, s1.SectionName, g.GenderName, c.FullName as 'CoachName', p.ProjectileName
                FROM Schedules s 
                JOIN SectionGroups sg ON s.GroupId = sg.GroupId 
                JOIN Sections s1 ON s1.SectionId = sg.SectionId 
                JOIN Genders g ON s1.SectionGenderId = g.GenderId 
                JOIN Coaches c ON c.CoachId = sg.CoachId
                JOIN Projectiles p ON p.ProjectileId = s.ProjectileId`
        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },

    async deleteSchedule({params:{id}}, res) {
        query = `DELETE FROM Schedules WHERE ScheduleId = ${id}`

        try {
            const [data, emp] = await db.execute(query)        
            return res.status(200).json(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },

    async UpdateScedule({params:{id}, body}, res) {
        
    }

}
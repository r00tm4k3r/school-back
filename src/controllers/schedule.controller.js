const db = require('../config/database')
const boom = require('boom')

module.exports = {
    async getSchedules (_, res) {
        const query =  `SELECT s.ScheduleId, s.DateStart, s.DateEnd, sec.SectionName, sg.SectionGenderId, co.FullName, pro.ProjectileName, pro.ProjectileFloor
                        FROM Schedules s 
                        JOIN SectionGroups sg ON sg.GroupId = s.GroupId 
                        JOIN Sections sec ON sec.SectionId = sg.SectionId 
                        JOIN Coaches co ON co.CoachId = sg.CoachId 
                        JOIN Projectiles pro ON s.ProjectileId = pro.ProjectileId`
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
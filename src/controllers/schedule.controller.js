const db = require('../config/database')

module.exports = {
    async getSchedule (_, res) {
        let query = `
                    SELECT s.TrainDate, s1.SectionName, g.GenderName, c.FullName, p.ProjectileName
                    FROM Schedules s 
                    JOIN SectionGroups sg ON s.GroupId = sg.GroupId 
                    JOIN Sections s1 ON s1.SectionId = sg.SectionId 
                    JOIN Genders g ON s1.SectionGenderId = g.GenderId 
                    JOIN Coaches c ON c.CoachId = sg.CoachId
                    JOIN Projectiles p ON p.ProjectileId = s.ProjectileId 
        `

        const [data, emp] = await db.execute(query)
        return res.status(200).json(data)
    }
}
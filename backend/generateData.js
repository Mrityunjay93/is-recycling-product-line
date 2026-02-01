const faker = require('@faker-js/faker').faker;
const mysql = require('mysql2/promise');

async function generateCandidates() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root123',
        database: 'candidate_ranking'
    });

    for (let i = 0; i < 40; i++) {
        const name = faker.person.fullName();
        const experience = faker.number.int({ min: 1, max: 20 });
        const skills = [
            faker.helpers.arrayElement(['Leadership', 'Recycling Processes', 'Sustainability', 'Team Management', 'Crisis Handling']),
            faker.helpers.arrayElement(['Supply Chain', 'Waste Management', 'Environmental Compliance', 'Motivation Techniques', 'Data Analysis'])
        ].join(', ');  // Random 2 skills

        // Insert candidate
        const [result] = await connection.execute(
            'INSERT INTO candidates (name, experience, skills) VALUES (?, ?, ?)',
            [name, experience, skills]
        );
        const candidateId = result.insertId;

        // Mock AI evaluations (random scores 0-100)
        const crisis = faker.number.int({ min: 0, max: 100 });
        const sustainability = faker.number.int({ min: 0, max: 100 });
        const team = faker.number.int({ min: 0, max: 100 });

        // Insert evaluations (trigger will update rankings)
        await connection.execute(
            'INSERT INTO evaluations (candidate_id, crisis_management, sustainability, team_motivation) VALUES (?, ?, ?, ?)',
            [candidateId, crisis, sustainability, team]
        );
    }

    console.log('40 candidates generated!');
    await connection.end();
}

generateCandidates().catch(console.error);
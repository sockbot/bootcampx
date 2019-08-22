require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
})

pool.query(`
SELECT DISTINCT teachers.name AS teachers, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${process.argv[2]}'
GROUP BY cohorts.name, teachers.name
ORDER BY teachers.name;
`)
.then(res => {
  res.rows.forEach(assistReq => {
    console.log(`${assistReq.cohort}: ${assistReq.teachers}`)
  });
  pool.end();
}).catch(err => console.error('query error', err.stack));
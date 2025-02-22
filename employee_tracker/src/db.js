import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: '4is4me44',
    port: 5432,
});

const query = async (text, params) => {
    const res = await pool.query(text, params);
    return res;
};

export default {query};

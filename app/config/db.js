const mysql =  require('mysql2')

const dbconnection ={
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'workman_ems'
}
const pool = mysql.createPool({
    host: dbconnection.host,
    user: dbconnection.user,
    password: dbconnection.password,
    database: dbconnection.database
}).promise()

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);

    } else {
        console.log('Connected to the database!');
        connection.release(); // Release the connection when done with it.
       

    }
});

const getEmployees = async ()=>{
    const [rows] = await pool.query("SELECT * FROM employees")
    return rows
}
//Get One
const getOne  =  async(id)=>{
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?",[id])
    return rows[0]
}
const create = async (fname, lname, sex, age, dept, emp_id, email, status, salary, address, start_date, position, contract) => {
    try {
      const [res] = await pool.query(`
        INSERT INTO employees (fname, lname, sex, age, dept, emp_id, email, status, salary, address, start_date, position, contract)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [fname, lname, sex, age, dept, emp_id, email, status, salary, address, start_date, position, contract]);
  
      const id = res.insertId;
      return getOne(id);
    } catch (error) {
      console.error('Error creating an employee:', error.message);
      throw error;
    }
  };

const removeOne = async (id)=>{
  try {
    const [res] = await pool.query("DELETE FROM employees WHERE  ID = ?", [id])
    
    const res_id = res.insertId;
    return getOne(res_id);
  } catch (error) {
    console.error('Error deleting an employee:', error.message);
      throw error;
    
  }
  
}
const update = async (id,fname, lname,sex, age, dept, emp_id, email, status, salary, address, start_date, position, contract)=>{
  try {
    const [row] = await pool.query(`UPDATE employees
      SET fname=?, lname=?, sex=?, age=?, dept=?, emp_id=?, email=?, status=?, salary=?, address=?, start_date=?, position=?, contract=?
      WHERE ID = ?`,
      [ fname, lname, sex, age, dept, emp_id, email, status, salary, address, start_date, position, contract, id]);
    
      const affectedRows = row.affectedRows;

      if (affectedRows > 0) {
        return getOne(id);
      } else {
        throw new Error(`Employee with ID ${id} not found.`);
      }
  } catch (error) {
    console.error('Error updating an employee:', error.message);
      throw error;
    
  }
}

  
module.exports = {dbconnection, pool, getEmployees, getOne, create, removeOne, update}

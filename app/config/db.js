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
  const query = `
  SELECT e.*, d.dept_name, p.position
  FROM employees e
   LEFT JOIN department d ON e.dept_id = d.dept_id
  LEFT JOIN positions p ON e.pos_id = p.pos_id
  `;
    const [rows] = await pool.query(query)
    return rows
}
//Get One
const getOne  =  async(emp_id)=>{
  const query = `
  SELECT e.*, d.dept_name, p.position
  FROM employees e
  LEFT JOIN department d ON e.dept_id = d.dept_id
  LEFT JOIN positions p ON e.pos_id = p.pos_id
  WHERE e.emp_id = ?`;
    const [rows] = await pool.query(query,[emp_id])
    return rows[0]
}
const create = async (fname, lname, sex, age, email, status, salary,id_number, cell_number, address, start_date, contract, dept_id, pos_id) => {
    try {
      const query = `INSERT INTO employees (fname, lname, sex, age, email, status, salary, id_number, cell_number, address, start_date, contract, dept_id, pos_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        
        `
      const [res] = await pool.query(query, [fname, lname, sex, age, email, status, salary, id_number, cell_number, address, start_date, contract, dept_id, pos_id]);
  
      const id = res.insertId;
      return getOne(id);
    } catch (error) {
      console.error('Error creating an employee:', error.message);
      throw error;
    }
  };

const removeOne = async (emp_id)=>{
  try {
    const [res] = await pool.query("DELETE FROM employees WHERE  emp_id = ?", [emp_id])
    
    const res_id = res.insertId;
    return getOne(res_id);
  } catch (error) {
    console.error('Error deleting an employee:', error.message);
      throw error;
    
  }
  
}
const update = async (fname, lname,sex, age, email, status, salary,id_number, cell_number, address, start_date, contract, dept_id, pos_id, emp_id)=>{
  try {
    const [row] = await pool.query(`UPDATE employees
      SET fname=?, lname=?, sex=?, age=?, email=?, status=?, salary=?,id_number=?, cell_number=?, address=?, start_date=?, contract=?, dept_id=?, pos_id=?
      WHERE emp_id = ?`,
      [fname, lname, sex, age, email, status, salary,id_number, cell_number, address, start_date, contract,dept_id, pos_id,emp_id]);
    
      const affectedRows = row.affectedRows;

      if (affectedRows > 0) {
        return getOne(emp_id);
      } else {
        throw new Error(`Employee with emp id ${emp_id} not found.`);
      }
  } catch (error) {
    console.error('Error updating an employee:', error.message);
      throw error;
    
  }
}

  
module.exports = {dbconnection, pool, getEmployees, getOne, create, removeOne, update}
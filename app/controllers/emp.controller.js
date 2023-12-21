const db = require('../config/db')

const getAlls = async (req,res)=>{
    try{
        const results = await db.getEmployees()
        console.log("Got all the employees!",{results})
        res.send(results)
    }catch(err){
        console.log("Something nasty happened!", err)
    }
}
const getOneEmp = async(req, res)=>{
    try {
        const id = req.params.id
        const employee = await db.getOne(id)
        res.status(200).send({message:"Employee retrived successfully!:", employee})
    } catch (error) {
        console.log('Something broke !shit', error)
    }
}
const createEmployee = async (req, res)=>{
    try{
        const {fname, lname, sex, age, dept, email, status, salary, id_number, cell_number,address, start_date, position, contract} = await req.body;
        const employee = await db.create(fname, lname, sex, age, dept, email, status, salary,id_number, cell_number, address, start_date, position, contract)
        console.log(employee)
        res.send(employee)
    }
    catch(err){
        console.log(err);
        res.status(500).send({ message: 'Internal Server Error' });

    }
    
}

const deleteOne =  async (req, res)=>{
    try {
        const id =  req.params.id
        const employee  = await db.removeOne(id)
        console.log(employee)
        res.send({message:"Deleted employee with:", id, employee})
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error, Couln\'t delete employee' });
    }
}
const updateOne =  async (req, res)=>{
    try {
        const id = req.params.id
        if (!id){
            console.log("Could not find employee with id:", id)
            return
        }
        console.log(id)
        if(!req.body){
            console.log("Could not modify the employee data")
            return 
        }
        const {fname, lname, sex, age, dept, email, status, salary, id_number, cell_number, address, start_date, position, contract} = await req.body
        console.log(fname)
        const results = await db.update(fname, lname, sex, age, dept, email, status, salary,id_number, cell_number, address, start_date, position, contract, id)
        console.log(results)
        res.status(201).send(results)
    } catch (error) {
        console.error('Error updating an employees:', error.message, error.stack);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {getAlls, getOneEmp, createEmployee, deleteOne, updateOne}
const db = require('./db');
const config = require('../config');
const keyPass = 'ASDFG0987';

async function login(userName, password){
    const rows = await db.query(
        `SELECT id_user, name_user, login_user, AES_DECRYPT(passord_user, "${keyPass}"), created_in, modified_in
        FROM secure_users WHERE login_user = "${userName}" AND AES_DECRYPT(passord_user, "${keyPass}") = "${password}";` 
    );
  
    let message = 'NONE';

    if (rows) {
      message = 'OK';
    }
  
    return {message};
  }

  async function create(users){
    const result = await db.query(
      `INSERT INTO secure_users 
      (id_user, name_user, login_user, AES_ENCRYPT(passord_user, "${keyPass}"), created_in, modified_in) 
      VALUES 
      (${users.id_user}, "${users.name_user}", "${users.login_user}", "${users.passord_user}", 
        "${users.created_in}", "${users.modified_in}")`
    );
  
    let message = 'Error in creating user';
  
    if (result.affectedRows) {
      message = 'User created successfully';
    }
  
    return {message};
  }
  
  async function update(id, users){
    const result = await db.query(
      `UPDATE secure_users SET
      name_user = ${users.name_user}, login_user = "${users.login_user}", 
      ES_ENCRYPT(passord_user, "${keyPass}") = "${users.passord_user}", modified_in = "${users.modified_in}" 
      WHERE id_user = ${id}` 
    );
  
    let message = 'Error in updating user';
  
    if (result.affectedRows) {
      message = 'User updated successfully';
    }
  
    return {message};
  }
  
  async function remove(id){
    const result = await db.query(
      `DELETE FROM secure_users WHERE id_user=${id}`
    );
  
    let message = 'Error in deleting user';
  
    if (result.affectedRows) {
      message = 'User deleted successfully';
    }
  
    return {message};
  }


  module.exports = {
    login,
    create, 
    update,
    remove,
  }
  
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id_occurrence, acronym_base, date_occurrence, driver_name, profile_product, user_name, shipping_number, negotiation_type, 
    modality_name, requested_help, status_description, time_status 
    FROM panel_occurrences LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(painelSAM){
  const result = await db.query(
    `INSERT INTO panel_occurrences 
    (id_occurrence, acronym_base, date_occurrence, driver_name, profile_product, user_name, shipping_number,
      negotiation_type, modality_name, requested_help, status_description, time_status) 
    VALUES 
    (${painelSAM.id_occurrence}, "${painelSAM.acronym_base}", "${painelSAM.date_occurrence}", "${painelSAM.driver_name}", 
      "${painelSAM.profile_product}", "${painelSAM.user_name}", "${painelSAM.shipping_number}", "${painelSAM.negotiation_type}", 
      "${painelSAM.modality_name}", "${painelSAM.requested_help}", "${painelSAM.status_description}", ${painelSAM.time_status})`
  );

  let message = 'Error in creating occurrence';

  if (result.affectedRows) {
    message = 'Occurrence created successfully';
  }

  return {message};
}

async function update(id, painelSAM){
  const result = await db.query(
    `UPDATE panel_occurrences SET
    date_occurrence = ${painelSAM.date_occurrence}, acronym_base = "${painelSAM.acronym_base}", driver_name = "${painelSAM.driver_name}", 
    profile_product = "${painelSAM.profile_product}", user_name = "${painelSAM.user_name}", shipping_number = "${painelSAM.shipping_number}", 
    negotiation_type = "${painelSAM.negotiation_type}", modality_name = "${painelSAM.modality_name}", requested_help = "${painelSAM.requested_help}", 
    status_description = "${painelSAM.status_description}", time_status = "${painelSAM.shipping.time_status}" 
    WHERE id_occurrence = ${id}` 
  );

  let message = 'Error in updating occurence';

  if (result.affectedRows) {
    message = 'Occurrence updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM panel_occurrences WHERE id=${id}`
  );

  let message = 'Error in deleting occurrence';

  if (result.affectedRows) {
    message = 'Occurrence deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create, 
  update,
  remove,
}
const db = require('../../data/db-config')

async function find() { // EXERCISE A
  const rows = await db('schemes as sch')
    .leftJoin('steps as s', 'sch.scheme_id', 'step.scheme_id')
    .select('sch.*')
    .count('step.step_id as number_of_steps')
    .groupBy('sch.scheme_id')
    .orderBy('sch.scheme_id', 'ASC')
  console.log(rows)
  return rows
}

async function findById(scheme_id) { // EXERCISE B
  const rows = await db('schemes as sch')
    .leftJoin('steps as st', 'sch.scheme_id', 'step.scheme_id')
    .where('sch.scheme_id', scheme_id)
    .select('sch.*', 'sch.scheme_name', 'sch.scheme_id')
    .orderBy('step.step_number', 'ASC')

    const results = {
      scheme_id: rows[0].scheme_id,
      scheme_name: rows[0].scheme_name, 
      steps: []
    }

    rows.forEach(row => {
      if(row.step_id) {
        results.steps.push({
          step_id: row.step_id,
          step_number: row.step_number,
          instructions: row.instructions,
        })
      }
    })
    return results
}

async function findSteps(scheme_id) { // EXERCISE C
  const rows = await db('schemes as sch')
    .leftJoin('steps as st', 'sch.scheme_id', 'st.scheme_id')
    .select('st.step_id', 'st.step_number', 'instructions', 'sch.scheme_name')
    .where('sch.scheme_id', scheme_id)
    .orderBy('st.step_number')

    if (!rows[0].step_id){
      return []
    } else {
      return rows
    }
}

async function add(scheme) { // EXERCISE D
  await db('schemes').insert(scheme)
  return db('schemes').where('scheme_name', scheme.scheme_name).first();
}

function addStep(scheme_id, step) { // EXERCISE E
  return db('steps').insert({ ...step, scheme_id })
    .then(() => {
      return db('steps as st')
        .join('schemes as sc', 'sc.scheme_id', 'st.scheme_id')
        .select('step_id', 'step_number', 'instructions', "scheme_name")
        .where('sc.scheme_id', scheme_id)
        .orderBy('step_number', 'ASC')
    })

}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}

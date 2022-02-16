const db = require('../../data/db-config')

const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.params
    const exists = await db('schemes')
      .where('scheme_id', scheme_id).first()
      if(!exists){
        res.status(404).json({
          status: 404,
          message: `scheme with scheme_id ${scheme_id} not found`,
        })
      } else {
        next()
      }
  } catch (err) {
    next(err)
  }
}

const validateScheme = (req, res, next) => {
  const { scheme_name } =  req.body
  if (!scheme_name || scheme_name === "" || typeof scheme_name !== 'string') {
    res.status(400).json({ 
      status: 400,
      message: 'Invalid Scheme name',
    })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if(instructions === undefined || typeof instructions !== 'string' || !instructions.trim() || typeof step_number !== 'number' || step_number < 1) {
    res.status(400).json({
      status: 400,
      message: 'invalid step'
    })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}

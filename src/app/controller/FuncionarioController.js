const { Funcionarios } = require('../models')

class FuncionarioController {
  async index(req, res) {

    const funcionarios = await Funcionarios.findAll()

    return res.render('auth/providers', { funcionarios })
  }

  async register(req, res) {

    const {id} = req.params

    if (id) {
      const funcionario = await Funcionarios.findAll({ where: { id } })
      return res.render('auth/providers-register')
    }

    return res.render('auth/providers-register')
  }

  async store(req, res) {

    const { matricula } = req.body
    const matriculaExiste = await Funcionarios.findAll({ where: { matricula } })

    if (matriculaExiste) {
      return res.render('auth/providers-register',
        { alertMatriculaExiste: 'Matrícula já existe no banco de dados.' })
    }

    await Funcionarios.create(req.body)
    return res.redirect('/app/providers')
  }

  async update(req, res) {
    await Funcionarios.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.redirect('/app/providers')
  }

  async destroy(req, res) {
    
  }

}

module.exports = new FuncionarioController()

const serviceToken = require('../../../../shared/token')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization && authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Unauthotized',
      code: 'UNAUTHORIZED',
      erros: [
        'Usuário não autorizado.'
      ]
    })
  }

  const verifyToken = serviceToken.verify(token)
  if (!verifyToken) {
    return res.status(403).json({
      message: 'Forbidden',
      code: 'FORBIDDEN',
      erros: [
        'Usuário não autorizado a acessar esse endpoind.'
      ]
    })
  }

  req.userAuthorized = {
    id: verifyToken.id,
    email: verifyToken.email,
    name: verifyToken.name,
    nickname: verifyToken.nickname
  }
  next()
}

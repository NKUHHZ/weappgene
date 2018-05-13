const { mysql } = require('../qcloud')

module.exports = async ctx => {

  await mysql('record').select('*').where(ctx.query).then(res => {
    ctx.state.data = {
      msg: res
    }
  })

}
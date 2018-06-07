const {mysql}=require('../qcloud')

module.exports = async ctx => {
  var page=parseInt(ctx.query.page)
  
  await mysql('record').select('*').where(ctx.query.parameter).limit('5').offset(page).then(res=>{
    ctx.state.data = {
      msg: res
    }
  })
  
}
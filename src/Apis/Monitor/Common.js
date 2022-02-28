import request from '@/Utils/HttpRequest'

// 获取集群名称列表
function monitors () {
   return request.$get('/monitors')
}

export {
   monitors
}
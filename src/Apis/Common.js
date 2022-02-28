import request from '@/Utils/HttpRequest'

// 获取主机列表
function nodes () {
   return request.$get('/nodes')
}

// 获取日志源列表
function logSources() {
   return request.$get('logs')
}

export {
   logSources,
   nodes
}
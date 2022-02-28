import request from '@/Utils/HttpRequest'

// 获取客户端列表
function logAgents() {
   return request.$get('/log_agents')
}

// 添加客户端
function addLogAgent(data) {
   return request.$post('/log_agents', data)
}

// 添加客户端
function editLogAgent(data) {
   return request.$put('/log_agents/' + data.id, data)
}

// 删除客户端
function deleteLogAgent(id) {
   return request.$delete('/log_agents/' + id)
}

// 获取客户端详情
function logAgentDetail(id) {
   return request.$get(`log_agents/${id}`)
}

export default {
   logAgentDetail,
   deleteLogAgent,
   editLogAgent,
   addLogAgent,
   logAgents
}

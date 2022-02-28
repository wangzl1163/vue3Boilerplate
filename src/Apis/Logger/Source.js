import request from '@/Utils/HttpRequest'

// 添加日志源
function addSource(data) {
   return request.$post('logs', data)
}

// 修改日志源
function editSource(data) {
   return request.$put('logs/' + data.log_name)
}

// 删除日志源
function deleteSource(name) {
   return request.$delete('logs/' + name)
}

export default {
   deleteSource,
   addSource,
   editSource
}
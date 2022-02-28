/*
 * @Description: 主机配置api
 * @Author: 王占领
 * @Date: 2021-01-28 11:32:56
 * @LastEditTime: 2021-06-01 10:10:39
 * @LastEditors: 王占领
 * @FilePath: \ctfo-monitor-logging-front\micro-web\client\src\Apis\Config\Host.js
 */
import request from '@/Utils/HttpRequest'

// 添加主机
function addNode(data) {
   return request.$post('nodes', data)
}

// 修改主机
function editNode(data) {
   return request.$put('nodes/' + data.addr, data)
}

// 删除主机
function deleteNode(addr) {
   return request.$delete('nodes/' + addr)
}

// 添加监控
function addMonitor(address) {
   return request.$get(`nodes/${address}/monitor/install`)
}

// 删除监控
function deleteMonitor(address) {
   return request.$get(`nodes/${address}/monitor/uninstall`)
}

// 添加进程
function addProcess(address) {
   return request.$get(`nodes/${address}/monitor/install/process`)
}

// 编辑进程
function editProcess(address, model) {
   return request.$put(`nodes/${address}/monitor/reconfig/process`, model)
}

// 删除进程
function deleteProcess(address) {
   return request.$get(`nodes/${address}/monitor/uninstall/process`)
}

export default {
   deleteMonitor,
   addMonitor,
   deleteNode,
   editNode,
   addNode,
   addProcess,
   editProcess,
   deleteProcess
}
import request from '@/Utils/HttpRequest'
import { timestamp2DateTime } from '@/Utils/PageUtils';

const createUri4Query = (name, metrics, type = 'k8s_cluster') => `/monitors/${name}/type/${type}/metrics/${metrics}/query`
const queryRange = (name,metrics,params = {},type = 'k8s_etcd', method = 'get') => request['$' + method](`/monitors/${name}/type/${type}/metrics/${metrics}/query_range`, params).then(res => {
   if (res.message.result.length>0) {
      res.message.result.forEach(item =>{
         item.values = timestamp2DateTime(item.values)
      })
   }

   return res
})

// 获取全部节点数
function totalNode(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:node:total'))
}

// 获取运行中节点数
function runningNode(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:node:online'))
}

// 获取异常节点数
function offlineNode(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:node:offline'))
}

// 获取CPU总量
function totalCPU(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:cpu:total:core'))
}

// 获取cpu已使用量
function usedCPU(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:cpu:usage:core'))
}

// 获取cpu未使用量
function unusedCPU(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:cpu:available:core'))
}

// 获取内存总量
function totalMemory(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:memory:total'))
}

// 获取内存已使用量
function usedMemory(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:memory:usage'))
}

// 获取内存未使用量
function unusedMemory(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:memory:available'))
}

// 获取本地存储总量
function totalDisk(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:disk:size:capacity'))
}

// 获取存储已使用量
function usedDisk(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:disk:size:usage'))
}

// 获取存储未使用量
function unusedDisk(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:disk:size:available'))
}

// 获取容器组总量
function totalPod(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:pod:quota'))
}

// 获取容器已使用量
function usedPod(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:pod:count'))
}

// 获取容器未使用量
function unusedPod(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:pod:available'))
}

// 添加集群监控
function addCluster(data) {
   return request.$post('monitors', data)
}

// 编辑集群监控
function editCluster(monitorName,data) {
   return request.$put('monitors/' + monitorName, data)
}

// 删除集群监控
function deleteCluster(monitorName) {
   return request.$delete('monitors/' + monitorName)
}

// pod总数
function allPod(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:pod:count'))
}

// pod健康数
function healthyPod(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:pod:succeeded:count'))
}

// pod异常数
function abnormalPod(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:pod:abnormal:count'))
}

// Deployment总数
function totalDeployment(monitorName, metric = 'cluster', type = 'k8s_cluster', params = {}) {
   return request.$get(createUri4Query(monitorName, `k8s:${metric}:deployment:count`, type), params)
}

// namespace数
function totalNamespace(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:cluster:namespace:count'))
}

// Statefulset总数
function totalStatefulset(monitorName, metric = 'cluster', type = 'k8s_cluster', params = {}) {
   return request.$get(createUri4Query(monitorName,  `k8s:${metric}:statefulset:count`, type), params)
}

// service总数
function totalService(monitorName, metric = 'cluster', type = 'k8s_cluster', params = {}) {
   return request.$get(createUri4Query(monitorName,  `k8s:${metric}:service:count`, type), params)
}

// Daemonset总数
function totalDaemonset(monitorName, metric = 'cluster', type = 'k8s_cluster', params = {}) {
   return request.$get(createUri4Query(monitorName,  `k8s:${metric}:daemonset:count`, type), params)
}

// PVC资源总数
function totalPVC(monitorName, metric = 'cluster', type = 'k8s_cluster', params = {}) {
   return request.$get(createUri4Query(monitorName,  `k8s:${metric}:pvc:count`, type), params)
}

// cpu使用情况（折线图）
function cpuAreaLine(monitorName, params) {
   return queryRange(monitorName, 'k8s:cluster:cpu:utilisation', params, 'k8s_cluster')
}

// 内存使用情况（折线图）
function memoryAreaLine(monitorName, params) {
   return queryRange(monitorName, 'k8s:cluster:memory:utilisation', params, 'k8s_cluster')
}

// 存储使用情况（折线图）
function diskAreaLine(monitorName, params) {
   return queryRange(monitorName, 'k8s:cluster:disk:size:utilisation', params, 'k8s_cluster')
}

// 容器组使用情况（折线图）
function podAreaLine(monitorName, params) {
   return queryRange(monitorName, 'k8s:cluster:pod:utilisation', params, 'k8s_cluster')
}

// ETCD节点信息及leader信息
function etcdNode(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:etcd:server:has:leader', 'k8s_etcd'))
}

// ETCDleader变更次数
function etcdNodeChanges(monitorName) {
   return request.$get(createUri4Query(monitorName, 'k8s:etcd:server:leader:changes', 'k8s_etcd'))
}

// etcd 提议失败速率
function raftFailedRate(monitorName, params) {
   return queryRange(monitorName, 'k8s:etcd:server:proposals:failed:rate', params)
}

// etcd提议提交速率
function raftCommitRate(monitorName, params) {
   return queryRange(monitorName, 'k8s:etcd:server:proposals:committed:rate', params)
}

// etcd提议应用速率
function raftAppliedRate(monitorName, params) {
   return queryRange(monitorName, 'k8s:etcd:server:proposals:applied:rate', params)
}

// etcd排队提议数
function raftPendingCount(monitorName, params) {
   return queryRange(monitorName, 'k8s:etcd:server:proposals:pending:count', params)
}

// etcd 库大小
function DBSize(monitorName, params) {
   return queryRange(monitorName, 'k8s:etcd:mvcc:db:ize', params)
}

// etcd 客户端流量（接收）
function clientReceivedBytes(monitorName, params) {
   return queryRange(monitorName, 'k8s:etcd:network:client:grpc:received:bytes', params)
}

// etcd客户端流量（输出）
function clientSentBytes(monitorName, params) {
   return queryRange(monitorName, 'k8s:etcd:network:client:grpc:sent:bytes', params)
}

// api server 请求延迟
function requestDelay(monitorName, params) {
   return queryRange(monitorName, 'k8s:apiserver:request:by:verb:latencies', params, 'k8s_apiserver')
}

// apiserver请求速率
function requestRate(monitorName, params) {
   return queryRange(monitorName, 'k8s:apiserver:request:rate', params, 'k8s_apiserver')
}

// 调度器调度次数
function dispatchCount(monitorName, params) {
   return queryRange(monitorName, 'k8s:scheduler:schedule:attempts', params, 'k8s_scheduler')
}

// 调度器调度速率
function dispatchRate(monitorName, params) {
   return queryRange(monitorName, 'k8s:scheduler:schedule:attempt:rate', params, 'k8s_scheduler')
}

export {
   dispatchRate,
   dispatchCount,
   requestRate,
   requestDelay,
   clientSentBytes,
   clientReceivedBytes,
   DBSize,
   raftPendingCount,
   raftAppliedRate,
   raftCommitRate,
   raftFailedRate,
   etcdNodeChanges,
   etcdNode,
   podAreaLine,
   diskAreaLine,
   memoryAreaLine,
   cpuAreaLine,
   totalNode,
   runningNode,
   offlineNode,
   totalCPU,
   usedCPU,
   unusedCPU,
   totalMemory,
   usedMemory,
   unusedMemory,
   totalDisk,
   usedDisk,
   unusedDisk,
   totalPod,
   usedPod,
   unusedPod,
   addCluster,
   editCluster,
   deleteCluster,
   allPod,
   healthyPod,
   abnormalPod,
   totalDeployment,
   totalNamespace,
   totalStatefulset,
   totalService,
   totalDaemonset,
   totalPVC
}
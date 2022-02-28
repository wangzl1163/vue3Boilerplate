import { wrapQuery, wrapQueryRange, wrapLabelsData } from '../CreateRequest';
import { createApi } from '../ApiFactory';

const nodeQuery = wrapQuery('k8s_node')
const nodeQueryRange = wrapQueryRange('k8s_node')
const nodeLabelsData = wrapLabelsData('k8s_node')
const getApi = (apiName) => createApi(apiName, 'k8s_node')

// 节点监控——节点列表
function nodeList(monitorName) {
   return nodeLabelsData(monitorName)
}

// cpu核数, params: {node: node名称}
function cpuCore(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:cpu:core', params)
}

// cpu使用核数, params: {node: node名称}
function cpuUsedCore(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:cpu:usage', params)
}

// cpu使用率, params: {node: node名称}
function cpuUsedCoreRate(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:cpu:utilisation', params)
}

// cpu 5 min 负载, params: {node: node名称}
function cpuLoad5(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:load5', params)
}

// 内存大小, params: {node: node名称}
function memoryTotal(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:memory:total', params)
}

// 内存使用, params: {node: node名称}
function memoryUsed(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:memory:usage', params)
}

// 内存使用率, params: {node: node名称}
function memoryUsedRate(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:memory:utilisation', params)
}

// 本地存储大小, params: {node: node名称}
function diskTotal(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:disk:size:capacity', params)
}

// 存储使用, params: {node: node名称}
function diskUsed(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:disk:size:usage', params)
}

// 存储使用率, params: {node: node名称}
function diskUsedRate(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:disk:size:utilisation', params)
}

// 磁盘读取, params: {node: node名称}
function diskRead(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:disk:read:bytes', params)
}

// 磁盘写入, params: {node: node名称}
function diskWrite(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:disk:write:bytes', params)
}

// 网络上传, params: {node: node名称}
function networkUplink(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:net:bytes:received', params)
}

// 网络下载, params: {node: node名称}
function networkDownlink(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:net:bytes:transmitted', params)
}

// 容器组总配额, params: {node: node名称}
function podTotal(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:pod:quota', params)
}

// 容器组已用, params: {node: node名称}
function podUsed(monitorName,params) {
   return nodeQuery(monitorName, 'k8s:node:pod:count', params)
}

// cpu使用率（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const cpuUsedRate4Line = getApi('cpuUsedRate4Line')

// 内存使用率（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const memoryUsedRate4Line = getApi('memoryUsedRate4Line')

// cpu 1 min 负载（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const cpuLoad14Line = getApi('cpuLoad14Line')

// cpu 5 min 负载（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const cpuLoad54Line = getApi('cpuLoad54Line')

// cpu 15 min 负载（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const cpuLoad154Line = getApi('cpuLoad154Line')

// 存储使用率（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const diskUsedRate4Line = getApi('diskUsedRate4Line')

// inode使用率（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const inodeUsedRate4Line = getApi('inodeUsedRate4Line')

// 磁盘读取（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const diskReadRate4Line = getApi('diskReadRate4Line')

// 磁盘写入（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const diskWriteRate4Line = getApi('diskWriteRate4Line')

// 磁盘读iops（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const diskReadIOPS4Line = getApi('diskReadIOPS4Line')

// 磁盘写iops（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const diskWriteIOPS4Line = getApi('diskWriteIOPS4Line')

// 网络上传（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const networkUplink4Line = getApi('networkUplink4Line')

// 网络下载（折线图）, params: {node: node名称, start: 开始时间，end：结束时间，step: 步长}
const networkDownlink4Line = getApi('networkDownlink4Line')

export {
   networkDownlink4Line,
   networkUplink4Line,
   diskWriteIOPS4Line,
   diskReadIOPS4Line,
   diskWriteRate4Line,
   diskReadRate4Line,
   inodeUsedRate4Line,
   diskUsedRate4Line,
   cpuLoad14Line,
   cpuLoad54Line,
   cpuLoad154Line,
   memoryUsedRate4Line,
   cpuUsedRate4Line,
   podTotal,
   podUsed,
   networkDownlink,
   networkUplink,
   diskWrite,
   diskRead,
   diskUsedRate,
   diskUsed,
   diskTotal,
   memoryUsedRate,
   memoryUsed,
   memoryTotal,
   cpuLoad5,
   cpuUsedCoreRate,
   cpuUsedCore,
   cpuCore,
   nodeList
}

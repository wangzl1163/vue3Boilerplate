import request from '@/Utils/HttpRequest'
import { wrapLabelsData, wrapQuery, wrapQueryRange } from './CreateRequest';
import { createApi } from './ApiFactory';

const hostQueryRange = (type, monitorName, metric, params) => wrapQueryRange(['linux', 'windows'].includes(type) ? type + '_host' : type)(monitorName, ['linux', 'windows'].includes(type) ? (type === 'linux' ? 'node' : type) + metric : metric, params)
const hostQuery = (type, monitorName, metric, params) => wrapQuery(['linux', 'windows'].includes(type) ? type + '_host' : type)(monitorName, ['linux', 'windows'].includes(type) ? (type === 'linux' ? 'node' : type) + metric : metric, params)
// type：标签页类别
const getApi = (apiName) => (type, prefix) => createApi(apiName, type + '_host', prefix === 'linux' ? 'node' : type)
// #region 
const linuxLabelsData = wrapLabelsData('linux_host')
const windowsLabelsData = wrapLabelsData('windows_host')

function addHostMonitor (params) {
   return request.$get('/monitors/general/overview')
}

// 节点健康状态，params：{instance：节点}
function hostHealthy(type, monitorName, params) {
   return hostQuery(type, monitorName, ':up', params)
}

// cpu核数，params：{instance：节点}
const cpuTotal = getApi('cpuTotal')

// cpu已使用，params：{instance：节点}
const cpuUsed = getApi('cpuUsed')

// cpu使用率，params：{instance：节点}
function cpuUsedRate(type, monitorName, params) {
   return hostQuery(type, monitorName, ':cpu:usage:percent', params)
}

// cpu 5 min负载，params：{instance：节点}
function cpuLoad5Avg(type, monitorName, params) {
   return hostQuery(type, monitorName, ':cpu:load5:avg', params)
}

// 内存大小，params：{instance：节点}
function memorySize(type, monitorName, params) {
   return hostQuery(type, monitorName, ':memory:size', params)
}

// 内存已使用大小，params：{instance：节点}
function memoryUsedSize(type, monitorName, params) {
   return hostQuery(type, monitorName, ':memory:usage:size', params)
}

// 内存使用率，params：{instance：节点}
function memoryUsedRate(type, monitorName, params) {
   return hostQuery(type, monitorName, ':memory:usage:percent', params)
}

// linux节点本地存储大小
const diskTotal4Linux = getApi('diskTotal')

// windows节点本地存储大小
function diskTotal4Windows(type, monitorName, params) {
   return hostQuery(type, monitorName, ':disk:total:size', params)
}

// linux节点本地存储已使用
const diskUsed4Linux = getApi('diskUsed')

// windows节点本地存储已使用
function diskUsed4Windows(type, monitorName, params) {
   return hostQuery(type, monitorName, ':disk:total:usage', params)
}

// linux节点本地存储使用率
const diskUsedRate4Linux = getApi('diskUsedRate')

// windows节点本地存储使用率
function diskUsedRate4Windows(type, monitorName, params) {
   return hostQuery(type, monitorName, ':disk:total:usage:percent', params)
}

// 磁盘读取，params：{instance：节点}
function diskReadRate(type, monitorName, params) {
   const metrics = type === 'linux' ? ':disk:read:byte:irate' : ':disk:read:byte:total'
   return hostQuery(type, monitorName, metrics, params)
}

// 磁盘写入，params：{instance：节点}
function diskWriteRate(type, monitorName, params) {
   const metrics = type === 'linux' ? ':disk:write:byte:irate' : ':disk:write:byte:total'
   return hostQuery(type, monitorName, metrics, params)
}

// 网络上传，params：{instance：节点}
function networkUplink(type, monitorName, params) {
   return hostQuery(type, monitorName, ':network:receive:irate', params)
}

// 网络下载，params：{instance：节点}
function networkDownlink(type, monitorName, params) {
   return hostQuery(type, monitorName, ':network:transmit:irate', params)
}

// 添加主机监控
function addHost2Monitor(address) {
   return request.$get(`nodes/${address}/monitor/install`)
}
// #endregion

// #region 
// cpu使用率（折线图）,params: {instance: 主机地址}
function cpuUsedRate4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, ':cpu:usage:percent', params)
}

// 内存使用率（折线图）,params: {instance: 主机地址}
function memoryUsedRate4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, ':memory:usage:percent', params)
}

// cpu 1 min平均负载（折线图）
const cpuLoad1Avg4Line = getApi('cpuLoad1Avg4Line')

// cpu 5 min平均负载（折线图）,params: {instance: 主机地址}
function cpuLoad5Avg4Line(type, monitorName, params) {
   return wrapQueryRange(type + '_host')(monitorName, 'node:cpu:load5:avg', params)
}

// cpu 15 min平均负载（折线图）
const cpuLoad15Avg4Line = getApi('cpuLoad15Avg4Line')

// 存储使用率（折线图）,params: {instance: 主机地址}
function diskUsedRate4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, type === 'linux' ? ':disk:size:utilisation': ':disk:total:usage:percent', params)
}

// inode使用率（折线图）,params: {instance: 主机地址}
const inodeUsedRate4Line = getApi('inodeUsedRate4Line')

// 磁盘读取（折线图）,params: {instance: 主机地址}
function diskReadRate4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, type === 'linux' ? ':disk:read:byte:irate': ':disk:read:bytes:irate', params)
}

// 磁盘写入（折线图）,params: {instance: 主机地址}
function diskWriteRate4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, type === 'linux' ? ':disk:write:byte:irate': ':disk:write:bytes:irate', params)
}

// iops读取（折线图）,params: {instance: 主机地址}
function iopsReadRate4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, type === 'linux' ? ':disk:reads:iops': ':disk:read:iops', params)
}

// iops写入（折线图）,params: {instance: 主机地址}
function iopsWriteRate4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, ':disk:write:iops', params)
}

// 网络上传（折线图）,params: {instance: 主机地址}
function networkUplink4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, ':network:receive:irate', params)
}

// 网络下载（折线图）,params: {instance: 主机地址}
function networkDownlink4Line(type, monitorName, params) {
   return hostQueryRange(type, monitorName, ':network:transmit:irate', params)
}
// #endregion

// #region 进程监控
// node进程
function nodeProcessLabelsData(monitorName) {
   return wrapLabelsData('linux_process')(monitorName)
}

// 组内进程数
function nodeProcessCount(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:num:procs', params)
}

// 组内线程数
function nodeThreadCount(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:num:threads', params)
}

// 组内进程CPU使用
function nodeProcessCPU(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:cpu:seconds:iragte', params)
}

// 组内进程物理内存使用
function nodeProcessPhysicalMemory(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:memory:resident:bytes', params)
}

// 组内进程虚拟内存使用
function nodeProcessVirtualMemory(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:memory:virtual:bytes', params)
}

// 组内进程网络读取速率
function nodeProcessNetworkReadRate(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:read:bytes:irate', params)
}

// 组内进程网络写入速率
function nodeProcessNetworkWriteRate(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:write:bytes:irate', params)
}

// 组内进程上下文切换速率
function nodeProcessSwitchContextRate(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:context:switches:irate', params)
}

// 组内进程主要页面错误速率
function nodeProcessMainPageErrorRate(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:major:page:faults:irate', params)
}

// 组内进程次要页面错误速率
function nodeProcessMinorPageErrorRate(monitorName, params) {
   return hostQueryRange('linux_process', monitorName, 'namedprocess:namegroup:minor:page:faults:irate', params)
}
// #endregion

export default {
   nodeProcessMinorPageErrorRate,
   nodeProcessMainPageErrorRate,
   nodeProcessSwitchContextRate,
   nodeProcessNetworkWriteRate,
   nodeProcessNetworkReadRate,
   nodeProcessVirtualMemory,
   nodeProcessPhysicalMemory,
   nodeProcessCPU,
   nodeThreadCount,
   nodeProcessLabelsData,
   nodeProcessCount,
   networkDownlink4Line,
   networkUplink4Line,
   iopsWriteRate4Line,
   iopsReadRate4Line,
   diskWriteRate4Line,
   diskReadRate4Line,
   inodeUsedRate4Line,
   diskUsedRate4Line,
   cpuLoad1Avg4Line,
   cpuLoad5Avg4Line,
   cpuLoad15Avg4Line,
   memoryUsedRate4Line,
   cpuUsedRate4Line,
   addHost2Monitor,
   networkDownlink,
   networkUplink,
   diskWriteRate,
   diskReadRate,
   diskUsedRate4Linux,
   diskUsedRate4Windows,
   diskUsed4Linux,
   diskUsed4Windows,
   diskTotal4Linux,
   diskTotal4Windows,
   memoryUsedRate,
   memoryUsedSize,
   memorySize,
   cpuLoad5Avg,
   cpuUsedRate,
   cpuUsed,
   cpuTotal,
   hostHealthy,
   addHostMonitor,
   linuxLabelsData,
   windowsLabelsData
}
import { wrapQuery, wrapQueryRange, wrapLabelsData } from '../CreateRequest';
import { createApi } from '../ApiFactory';

const podQuery = wrapQuery('k8s_pod')
const podQueryRange = wrapQueryRange('k8s_pod')
const podLabelsData = wrapLabelsData('k8s_pod')
const getApi = (apiName) => createApi(apiName, 'k8s_pod')

// 容器组监控——容器组列表、下拉框数据
function podData(monitorName, params) {
   return podLabelsData(monitorName, params)
}

// pod 元数据信息, params: {pod: pod名称}
function podMetaInfo(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:info', params)
}

// pod 状态, params: {pod: pod名称}
function podStatus(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:up', params)
}

// pod cpu使用, params: {pod: pod名称}
function podCPUUsed(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:cpu:usage', params)
}

// pod 内存使用, params: {pod: pod名称}
function podMemoryUsed(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:memory:usage:working', params)
}

// cpu使用量（折线图）, params: {pod: pod名称, start: 开始时间，end：结束时间，step: 步长}
const cpuUsed4Line = (monitorName, params) => podQueryRange(monitorName, 'k8s:pod:cpu:usage', params)

// 内存使用量（折线图）, params: {pod: pod名称, start: 开始时间，end：结束时间，step: 步长}
const memoryUsed4Line = (monitorName, params) => podQueryRange(monitorName, 'k8s:pod:memory:usage:working', params)

// 磁盘读（折线图）, params: {pod: pod名称, start: 开始时间，end：结束时间，step: 步长}
const diskRead4Line = (monitorName, params) => podQueryRange(monitorName, 'k8s:pod:fs:bytes:reads', params)

// 磁盘写（折线图）, params: {pod: pod名称, start: 开始时间，end：结束时间，step: 步长}
const diskWrite4Line = (monitorName, params) => podQueryRange(monitorName, 'k8s:pod:fs:bytes:writes', params)

// 网络上传（折线图）, params: {pod: pod名称, start: 开始时间，end：结束时间，step: 步长}
const networkUplink4Line = getApi('networkUplink4Line')

// 网络下载（折线图）, params: {pod: pod名称, start: 开始时间，end：结束时间，step: 步长}
const networkDownlink4Line = getApi('networkDownlink4Line')

// cpu申请大小, params: {pod: pod名称}
function cpuAppliedSize(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:cpu:request', params)
}

// cpu限制大小, params: {pod: pod名称}
function cpuLimitSize(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:cpu:limit', params)
}

// cpu已使用, params: {pod: pod名称}
const cpuUsed = getApi('cpuUsed')

// 内存申请大小, params: {pod: pod名称}
function memoryAppliedSize(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:memory:request', params)
}

// 内存限制大小, params: {pod: pod名称}
function memoryLimitSize(monitorName,params) {
   return podQuery(monitorName, 'k8s:pod:memory:limit', params)
}

export {
   memoryLimitSize,
   memoryAppliedSize,
   cpuLimitSize,
   cpuUsed,
   cpuAppliedSize,
   podMemoryUsed,
   podCPUUsed,
   podStatus,
   podMetaInfo,
   podData,
   networkDownlink4Line,
   networkUplink4Line,
   cpuUsed4Line,
   memoryUsed4Line,
   diskRead4Line,
   diskWrite4Line
}
import { wrapQuery, wrapQueryRange, wrapLabelsData } from '../CreateRequest';
import { createApi } from '../ApiFactory';

const namespaceQueryRange = wrapQueryRange('k8s_namespace')
const LabelsData = wrapLabelsData('k8s_namespace')
const getApi = (apiName) => createApi(apiName, 'k8s_namespace')

// 命名空间——列表、下拉框数据
function nameSpaceData(monitorName, params) {
   return LabelsData(monitorName, params)
}

// cpu申请
const cpuApplied = getApi('cpuApplied')

// cpu已使用
const cpuUsed = getApi('cpuUsed')

// cpu限制
const cpuLimit = getApi('cpuLimit')

// 内存申请
const memoryApplied = getApi('memoryApplied')

// 内存已使用
const memoryUsed = getApi('memoryUsed')

// 内存限制
const memoryLimit = getApi('memoryLimit')

// pod总数
const podUsed = getApi('podUsed')

// pod健康
const podHealthy = getApi('podHealthy')

// pod异常
const podAbnormal = getApi('podAbnormal')

// cpu使用量（折线图）, params: {namespace: namespace名称, start: 开始时间，end：结束时间，step: 步长}
const cpuUsed4Line = (monitorName, params) => namespaceQueryRange(monitorName, 'k8s:namespace:cpu:usage', params)

// 内存使用量（折线图）, params: {namespace: namespace名称, start: 开始时间，end：结束时间，step: 步长}
const memoryUsed4Line = (monitorName, params) => namespaceQueryRange(monitorName, 'k8s:namespace:memory:usage:working', params)

// 磁盘读（折线图）, params: {namespace: namespace名称, start: 开始时间，end：结束时间，step: 步长}
const diskRead4Line = (monitorName, params) => namespaceQueryRange(monitorName, 'k8s:namespace:fs:bytes:reads', params)

// 磁盘写（折线图）, params: {namespace: namespace名称, start: 开始时间，end：结束时间，step: 步长}
const diskWrite4Line = (monitorName, params) => namespaceQueryRange(monitorName, 'k8s:namespace:fs:bytes:writes', params)

// 网络上传（折线图）, params: {namespace: namespace名称, start: 开始时间，end：结束时间，step: 步长}
const networkUplink4Line = getApi('networkUplink4Line')

// 网络下载（折线图）, params: {namespace: namespace名称, start: 开始时间，end：结束时间，step: 步长}
const networkDownlink4Line = getApi('networkDownlink4Line')

export {
   networkDownlink4Line,
   networkUplink4Line,
   diskWrite4Line,
   diskRead4Line,
   memoryUsed4Line,
   cpuUsed4Line,
   memoryLimit,
   cpuLimit,
   podAbnormal,
   podHealthy,
   podUsed,
   memoryUsed,
   memoryApplied,
   cpuUsed,
   cpuApplied,
   nameSpaceData
}
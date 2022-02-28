import { wrapQuery, wrapQueryRange, wrapLabelsData } from './CreateRequest';

/**
 * 生成api
 * @param {String} name api name
 * @param {String} type api type
 * @param {String} metricPrefix metric prefix
 * @returns {Function} 返回一个执行相应url网络请求的函数
 */
const createApi = (name, type, metricPrefix = '') => {
   const mPrefix = metricPrefix || type.replace('_', ':')
   let api = null
   switch (name) {
      // 容器组总量
      case 'podTotal':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':pod:quota', params)
         break;

      // 容器组已使用
      case 'podUsed':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':pod:count', params)
         break;
      // pod健康
      case 'podHealthy':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':pod:succeeded:count', params)
         break;
      // pod异常
      case 'podAbnormal':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':pod:abnormal:count', params)
         break;
      // 内存申请
      case 'memoryApplied':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':memory:request', params)
         break;
      // 内存限制
      case 'memoryLimit':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':memory:limit', params)
         break;
      // 内存使用
      case 'memoryUsed':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':memory:usage:working', params)
         break;
      // cpu核数（总数）
      case 'cpuTotal':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':cpu:core', params)
         break;
      // cpu申请
      case 'cpuApplied':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':cpu:request', params)
         break;
      // cpu限制
      case 'cpuLimit':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':cpu:limit', params)
         break;
      // cpu已使用
      case 'cpuUsed':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':cpu:usage', params)
         break;
      // 本地存储大小（总量）
      case 'diskTotal':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':disk:size', params)
         break;
      // 本地存储已使用
      case 'diskUsed':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':disk:size:usage', params)
         break;
      // 本地存储使用率
      case 'diskUsedRate':
         api = (monitorName, params) => wrapQuery(type)(monitorName, mPrefix + ':disk:size:utilisation', params)
         break;
      // cpu使用率（折线图）
      case 'cpuUsedRate4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':cpu:utilisation', params)
         break;
      // 内存使用率（折线图）
      case 'memoryUsedRate4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':memory:utilisation', params)
         break;
      // cpu 1 min 负载（折线图）
      case 'cpuLoad14Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':load1', params)
         break;
      // cpu 5 min 负载（折线图）
      case 'cpuLoad54Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':load5', params)
         break;
      // cpu 15 min 负载（折线图）
      case 'cpuLoad154Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':load15', params)
         break;
      // cpu 1 min 平均负载（折线图）
      case 'cpuLoad1Avg4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':cpu:load1:avg', params)
         break;
      // cpu 5 min 平均负载（折线图）
      case 'cpuLoad5Avg4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':cpu:load5:avg', params)
         break;
      // cpu 15 min 平均负载（折线图）
      case 'cpuLoad15Avg4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':cpu:load15:avg', params)
         break;
      // 存储使用率（折线图）
      case 'diskUsedRate4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':disk:size:utilisation', params)
         break;
      // inode使用率（折线图）
      case 'inodeUsedRate4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':disk:inode:utilisation', params)
         break;
      // 磁盘读取（折线图）
      case 'diskReadRate4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':disk:read:bytes', params)
         break;
      // 磁盘写入（折线图）
      case 'diskWriteRate4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':disk:write:bytes', params)
         break;
      // 磁盘读iops（折线图）
      case 'diskReadIOPS4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':disk:read:iops', params)
         break;
      // 磁盘写iops（折线图）
      case 'diskWriteIOPS4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':disk:write:iops', params)
         break;
      // 网络上传（折线图）
      case 'networkUplink4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':net:bytes:received', params)
         break;
      // 网络下载（折线图）
      case 'networkDownlink4Line':
         api = (monitorName, params) => wrapQueryRange(type)(monitorName, mPrefix + ':net:bytes:transmitted', params)
         break;
      default:
         break;
   }

   return api
}

export {
   createApi
}
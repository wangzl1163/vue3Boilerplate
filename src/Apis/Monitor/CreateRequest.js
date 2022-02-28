import request from '@/Utils/HttpRequest'
import { timestamp2DateTime } from '@/Utils/PageUtils';

const query = (name, type, metrics, params = {}, method = 'get') => {
   return request['$' + method](`/monitors/${name}/type/${type}/metrics/${metrics}/query`, params)
}

const wrapQuery = (type, method = 'get') => (name, metrics, params) => query(name, type, metrics, params, method)

const queryRange = (name, type, metrics, params = {}, method = 'get') => {
   return request['$' + method](`/monitors/${name}/type/${type}/metrics/${metrics}/query_range`, params).then(res => {
      if (res.message.result.length>0) {
         res.message.result.forEach(item => {
            item.values = timestamp2DateTime(item.values)
         })
      }
   
      return res
   })
}

const wrapQueryRange = (type, method = 'get') => (name, metrics, params) => queryRange(name, type, metrics, params, method)

const labelsData = (name, type, params = {}, method = 'get') => {
   return request['$' + method](`monitors/${name}/type/${type}/labels_data`, params)
}

const wrapLabelsData = (type, method = 'get') => (name, params = {}) => labelsData(name, type, params, method)

export {
   request,
   query,
   wrapQuery,
   queryRange,
   wrapQueryRange,
   labelsData,
   wrapLabelsData
}
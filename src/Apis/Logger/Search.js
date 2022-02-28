import request from '@/Utils/HttpRequest'

// 集群下拉选项
function clusters() {
   return request.$get('logs')
}

// 主机下拉选项，根据集群获取
function hostNames(clusterName) {
   return request.$get(`logs/${clusterName}/hostnames`)
}

// 主机日志搜索
function hostLogSearch(params) {
   return request.$get(`/logs/${params.name}/nodeLogQueryRange`, params)
}

// 项目下拉选项
function projects(clusterName) {
   return request.$get(`logs/${clusterName}/namespaces`)
}

// 应用下拉选项
function applications(clusterName, projectName) {
   return request.$get(`/logs/${clusterName}/namespaces/${projectName}/apps`)
}

// pod/实例下拉选项
function instancesByApp(clusterName, projectName, applicationName) {
   return request.$get(`logs/${clusterName}/namespaces/${projectName}/apps/${applicationName}/instances`)
}
// pod/实例下拉选项
function instancesByWorkload(clusterName, projectName, workloadType, workloadName) {
   return request.$get(`logs/${clusterName}/namespaces/${projectName}/workloads/${workloadType}/${workloadName}/instances`)
}
// 应用日志搜索
function applicationLogSearch(params) {
   return request.$get(`logs/${params.name}/appLogQueryRange`, params)
}
// 工作负载名称
function workLoadTypes() {
   return request.$get(`logs_workload_type`)
}
// 工作负载名称
function workLoadNames(name,projectName,workloadType,) {
   // logs/{name}/namespaces/{namespaceName}/workloads/{workloadType}
   return request.$get(`logs/${name}/namespaces/${projectName}/workloads/${workloadType}`)
}

export default {
   applicationLogSearch,
   instancesByApp,
   instancesByWorkload,
   applications,
   projects,
   hostLogSearch,
   hostNames,
   clusters,
   workLoadTypes,
   workLoadNames
}

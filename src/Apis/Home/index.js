import request from '@/Utils/HttpRequest'

// 主机监控、k8s监控
function monitorOverview () {
   return request.$get('monitors/general/overview')
}

// 监控统计
function monitorCount(params) {
   return request.$get('monitor_alert/alert_record/totalSize', params)
}

// 监控告警趋势，默认最近一小时的10个时间点，可根据startAt和endAt调整查询时间
function monitorTrend(params) {
   return request.$get('monitor_alert/alert_record/alertTotalSizeRange', params)
}

// 监控告警top5，默认返回 最近 24 小时的数据，可根据startAt endAt调整
function monitorTop5(params) {
   return request.$get('monitor_alert/alert_record/alertTop5', params)
}

// 集群日志量
function clusterLogCount(params) {
   return request.$get('logs_metrics/clusterLogsTotal', params)
}

// 应用日志error top 5
function applicationErrorTop5(clusterName, params) {
   return request.$get(`logs/${clusterName}/metrics/appErrorLogsTop5`, params)
}

export {
   applicationErrorTop5,
   clusterLogCount,
   monitorTop5,
   monitorTrend,
   monitorCount,
   monitorOverview
}
import request from '@/Utils/HttpRequest'

// 获取告警指标 by type 已废弃
// function alarmIndicators(type) {
// 	return request.$get('/alert/monitor/alert_metrics/' + type)
// }
// 获取告警指标列表
function alarmIndicatorList(params) {
	return request.$get('/alert/monitor/alert_metrics', params)
}

// 添加告警指标
function addIndicator(data) {
	return request.$post('/alert/monitor/alert_metrics', data)
}

// 修改告警指标
function editIndicator(data) {
	return request.$put('/alert/monitor/alert_metrics',data)
}

// 删除告警指标
function deleteIndicator(id) {
	return request.$delete('/alert/monitor/alert_metrics/' + id)
}


export {

	alarmIndicatorList,
	editIndicator,
	addIndicator,
	deleteIndicator

}
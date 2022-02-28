import request from '@/Utils/HttpRequest'

// 获取告警模板
function histories(params) {
	return request.$get('/alert/monitor/alert_records', params)
}

export {
	histories
}
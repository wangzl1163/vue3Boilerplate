import request from '@/Utils/HttpRequest'

const url = '/alert/monitor/alert_policys'

// 获取告警规则
function rules(params) {
	return request.$get(url, params)
}

// 添加告警规则
function addRule(data) {
	return request.$post(url, data)
}

// 修改规则
function editRule(data) {
	return request.$put(url, data)
}

// 删除告警规则
function deleteRule(id) {
	return request.$delete(url + '/' + id)
}

// 获取详情
function detail(id) {
	return request.$get(url + '/' + id)
}

// 启用/禁用规则
function controlStatus(data) {
	return request.$put(url, data)
}

export {
	rules,
	deleteRule,
	controlStatus,
	addRule,
	detail,
	editRule
}
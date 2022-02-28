import request from '@/Utils/HttpRequest'

// 获取告警模板
function templates(params) {
	return request.$get('/alert/monitor/alert_templates', params)
}

// 获取告警模板详情
function detail(id) {
	return request.$get('/alert/monitor/alert_templates/' + id)
}

// 添加模板
function addTemplate(data) {
	return request.$post('/alert/monitor/alert_templates', data)
}

// 修改模板
function editTemplate(data) {
	return request.$put('/alert/monitor/alert_templates', data)
}

// 删除模板
function deleteTemplate(id) {
	return request.$delete('/alert/monitor/alert_templates/' + id)
}

export {
	templates,
	deleteTemplate,
	addTemplate,
	detail,
	editTemplate
}
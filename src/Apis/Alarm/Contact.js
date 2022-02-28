import request from '@/Utils/HttpRequest'

// 获取告警组列表
function groups () {
   return request.$get('/alert_groups')
}

// 添加告警组
function addGroup(data) {
	return request.$post('/alert_groups', data)
}

// 编辑告警组
function editGroup(data) {
	return request.$put('/alert_groups', data)
}

// 删除告警组
function deleteGroup(groupId) {
	return request.$delete('/alert_groups/' + groupId)
}

// 获取告警联系人
function contacts(params) {
   return request.$get('/alert_users', params)
}

// 添加联系人
function addContact(data) {
	return request.$post('/alert_users', data)
}

// 编辑联系人
function editContact(data) {
	return request.$put('/alert_users', data)
}

// 删除联系人
function deleteContact(userName) {
	return request.$delete('/alert_users/' + userName)
}

export {
   contacts,
	groups,
	deleteGroup,
	addGroup,
	editGroup,
	deleteContact,
	addContact,
	editContact
}
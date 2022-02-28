import request from '@/Utils/HttpRequest'

function getUserProfile (params) {
   return request.$get('', params)
}

function updateUserProfile (params) {
   return request.$post('', params)
}

// 修改密码，{username，password：旧密码， modify_password：新密码}
function updateUserPwd (data) {
   return request.$put('/login/modify', data)
}

export {
   getUserProfile,
   updateUserProfile,
   updateUserPwd
}

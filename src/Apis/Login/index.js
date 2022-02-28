import request from '@/Utils/HttpRequest'

function login (params) {
   return request.$post('/login', params)
}

function logout () {
   return request.$get('/logout')
}

function getUserInfo () {
   return request.$get('/login/auth')
}

function getCodeImg (params) {
   return request.$get('')
}

export {
   login,
   logout,
   getUserInfo,
   getCodeImg
}

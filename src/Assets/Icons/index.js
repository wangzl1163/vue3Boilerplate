/*
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-24 10:13:25
 * @LastEditTime : 2022-02-24 15:43:18
 * @LastEditors  : 王占领
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)

requireAll(req)

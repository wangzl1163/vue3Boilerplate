/*
 * @Description  : vite config
 * @Author       : 王占领
 * @Date         : 2022-02-23 10:33:12
 * @LastEditTime : 2022-02-24 15:43:50
 * @LastEditors  : 王占领
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		vue(),
		vueJsx({}),
		createSvgIconsPlugin({
			// 配置路劲在你的src里的svg存放文件
			iconDirs: [path.resolve(__dirname, 'src/Assets/Icons/svg')],
			symbolId: 'icon-[dir]-[name]'
		})
	]
})

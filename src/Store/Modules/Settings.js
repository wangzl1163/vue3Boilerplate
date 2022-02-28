import defaultSettings from '@/Settings.js';

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const state = {
   theme: storageSetting.theme || '#409EFF',
   sideTheme: storageSetting.sideTheme || '',
   tagsView: storageSetting.tagsView ?? defaultSettings.tagsView,
   fixedHeader: storageSetting.fixedHeader ?? defaultSettings.fixedHeader
}

const mutations = {
   CHANGE_SETTING: (state, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
         state[key] = value
      }
   }
}

const actions = {
   changeSetting ({ commit }, data) {
      commit('CHANGE_SETTING', data)
   }
}

const getters = {
   theme: (state) =>state.theme,
   tagsView: (state) => state.tagsView,
   fixedHeader: (state) => state.fixedHeader
}

export const settings = {
   state,
   mutations,
   actions,
   getters
}
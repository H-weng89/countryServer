// // import * as types from './mutation-types'

// // export const addBarrageList = ({ commit, state }, barrageInfo) => {
// //   const list = lang.cloneDeep(state.barrageList)
// //   const newList = list.filter(item => !item.isEnd)
// //   newList.push(barrageInfo)
// //   commit(types.SET_BARRAGE_LIST, newList)
// // }
import { getCity } from '@api'

export const changeList = async ({ commit, state }, payload) => {
  if (!state.isList) {
    const paperList = await getCity('paperwork_type')
    const educationList = await getCity('education')
    const countryList = await getCity('national')
    commit('changeList', { paperList, countryList, educationList })
  }
}

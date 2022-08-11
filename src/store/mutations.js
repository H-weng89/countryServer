// import * as types from './mutation-types'

const mutations = {
  // [types.SET_BARRAGE_LIST] (state, barrageList) {
  //   state.barrageList = barrageList
  // }
  changeList (state, { paperList, countryList, educationList }) {
    if (!state.isList) {
      state.countryList = countryList
      state.paperList = paperList
      state.educationList = educationList
      state.isList = true
    }
  }
}

export default mutations

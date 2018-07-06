import {
  createFetchAction,
  createReducer,
} from 'utils/reduxUtil'

import * as <%= props.project %>Api from 'apis/<%= props.projectName %>'

/* ------------- Types and Action Creators ------------- */
// 对账单分页列表
export const fetch<%= props.project %>List = createFetchAction({
  name: '<%= props.projectName %>list',
  api: <%= props.project %>Api.<%= props.projectName %>List
})

// 对账单信息
export const fetch<%= props.project %> = createFetchAction({
  name: '<%= props.projectName %>Info',
  api: <%= props.project %>Api.<%= props.projectName %>Info
})

/* ------------- Reducers and Initial State ------------- */
export const defaultState = {
  data: {
    list: [],
    pageSize: 50,
    currentPage: 1,
    totalCount: 0,
  }
}

export default createReducer({
  defaultState,
  name: '<%= props.projectName %>list',
})

import request from '../utils/request'

/**
 *
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns
 */
export const loginRequest = ({ username, password }) =>
  request.post('/api/login', null, {
    params: {
      username,
      password
    }
  })

/*
 * 根据token获取当前用户
 */
export const getUser = () =>
  request.post('/api/lics/loginLic/loginLic', null, {
    params: {
      token: localStorage.getItem('token')
    }
  })

/**
   * 根据refresh_token刷新token
   *
   */
export const getToken = () => {
  return request.post('/api/token/refresh', null, {
    params: { refreshToken: localStorage.getItem('refresh_token') }
  })
}

/**
 * 获取证件记录
 * @param {number} status  状态码
 * @param {string} applyId 申请id
 * @returns
 */
export const getHistory = (status, { pageNo = 1, pageSize = 30 }, applyId) =>
  request.get('/api/lic/record', {
    params: {
      status,
      pageNo,
      pageSize,
      applyId

    }
  })

/**
 * 获取我的消息
 *@param {string} mark 消息类型
 */

export const getMessage = (mark, { pageSize, pageNo }) =>
  request.get('/api/lic/message/v1.0/list', {
    params: {
      mark,
      pageSize,
      pageNo
    }
  })

/**
 * 获取未读消息数量
 *
 */

export const getUnmessage = () => request.get('/api/lic/message/v1.0/getCount')

/**
 * 消息已读
 * @param {string} id 消息id
 */

export const readMessage = (id) =>
  request.get(`/api/lic/message/v1.0/getMessage/${id}`)

/**
 * 获取我的申请
 * @param {string} status 0通过 1拒绝 5等待审批
 */

export const getApplication = (status, { pageSize, pageNo }) =>
  request.get('/api/lic/approval', {
    params: {
      status,
      pageSize,
      pageNo
    }
  })

/**
 * @{string} id 申请id
 * 获取申请流程
 */

export const getProcess = (id) =>
  request.get(`/api/lic/approval/v1.0/getProcess/${id}`)

/**
 * 审批列表获取
 * * @param {string} status 0通过 1拒绝 5等待审批
 */

export const getCheck = (status, { pageSize, pageNo }) =>
  request.get('/api/lic/process', {
    params: {
      status,
      pageNo,
      pageSize
    }
  })

/**
 * 提交申请
 *@param {Object} form 提交的数据
 *
 */

export const submitApply = (form) => {
  return request.post('/api/lic/approval/v1.0/save', form)
}

/**
 * 取消申请
 * @param {string} applyId 申请id
 * @param {string} reason 申请原因
 */

export const deleteApply = (applyId, reason) =>
  request.delete(`/api/lic/approval/v1.0/delete/${applyId}`, {
    data: {
      reason
    }
  })

/**
   * 查看已有的证件列表
   * @param {string} id 申请人id
   */
export const getPaper = (lenderId) => request.get('/api/certificate/manage/v1.0/list', { params: { lenderId } })

/**
 * 审批相关api 没有数据，测试不了
 *
 */

/**
 * 获取地区字典
 * @param {string} type 不同的字典类型
 */
export const getCity = (type) =>
  request.get('/api/system/dictionary', {
    params: {
      type,
      pageSize: 1000
    }
  })

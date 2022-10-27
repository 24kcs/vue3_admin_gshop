/* 
数据可视化接口请求函数模块
*/
import request from '@/utils/requestData'
import type { ReportDataModel } from './model'

export const reportDataApi = () => request.get<any, ReportDataModel>('/report/data')
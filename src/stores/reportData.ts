import { defineStore } from 'pinia'
// 引入api函数
import { reportDataApi } from '@/api/data'
// 引入数据的类型
import type { ReportDataModel } from '@/api/data/model'

export const useDataStore = defineStore({
  id: 'data',
  state () {
    return {
      reportData: {} as ReportDataModel
    }
  },
  // 通过接口获取数据
  actions: {
    async getData () {
      const reportData = await reportDataApi()
      this.reportData = reportData
    }
  }
})
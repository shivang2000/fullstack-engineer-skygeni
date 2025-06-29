import customerTypeData from '@/data/customer-type.json'
import { NextResponse } from 'next/server'
import { ICustomerType } from '../bar-chart-data/route'


export const GET = async () => {

  const total = (customerTypeData as ICustomerType[]).reduce((acc,curr) => acc+curr.acv,0)
  const totalForCustTypeNew = (customerTypeData as ICustomerType[]).filter(cust => cust.Cust_Type === 'New Customer').reduce((acc,curr) => acc+curr.acv,0)
  const totalForCustTypeOld = (customerTypeData as ICustomerType[]).filter(cust => cust.Cust_Type === 'Existing Customer').reduce((acc,curr) => acc+curr.acv,0)
  

  return NextResponse.json({data:{
    total,
    totalForCustTypeNew,
    totalForCustTypeOld
  }})
}

export interface IPieChartData {
  total: number
  totalForCustTypeNew: number
  totalForCustTypeOld: number
}
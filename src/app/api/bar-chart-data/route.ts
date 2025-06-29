// import accountIndustryData from '@/data/account-industry.json'
// import acvRangeData from '@/data/acv-range.json'
import customerTypeData from '@/data/customer-type.json'
// import teamData from '@/data/team.json'

export const GET = async () => {


  // getting list of unique closed_fiscal_quarter from customerTypeData
  const listQuarter = Array.from(new Set(customerTypeData.map(item => item.closed_fiscal_quarter)))

  const data = listQuarter.map(quarter => {

    const combined_data = customerTypeData.filter(item => item.closed_fiscal_quarter === quarter)

    return {
      closed_fiscal_quarter: quarter,
      total_count: customerTypeData.filter(item => item.closed_fiscal_quarter === quarter).reduce((sum, item) => sum + item.count, 0),
      total_acv: customerTypeData.filter(item => item.closed_fiscal_quarter === quarter).reduce((sum, item) => sum + item.acv, 0),
      combined_data,
    }
  })
  // sorting based on closed_fiscal_quarter
  data.sort((a, b) => {
    const quarterA = a.closed_fiscal_quarter.split('-Q')[0]
    const quarterB = b.closed_fiscal_quarter.split('-Q')[0]

    if (quarterA === quarterB) {
      return parseInt(a.closed_fiscal_quarter.split('-Q')[1]) - parseInt(b.closed_fiscal_quarter.split('-Q')[1])
    }

    return parseInt(quarterA) - parseInt(quarterB)

  })



  return Response.json({
    data
  })
}

export interface IBarChartSingleData {
  closed_fiscal_quarter: string;
  total_count: number;
  total_acv: number;
  
  combined_data: {
    count: number;
    acv: number;
    closed_fiscal_quarter: string;
    Cust_Type: 'Existing Customer'|'New Customer';
  }[];
}

export interface ICustomerType {
  count: number
  acv: number
  closed_fiscal_quarter: string
  Cust_Type: string
}

export interface IACVRange {
  count: number
  acv: number
  closed_fiscal_quarter: string
  ACV_range: string
}

export interface IAccountIndustry {
  count: number
  acv: number
  closed_fiscal_quarter: string
  Acct_Industry: string
  query_key: string
}

export interface ITeam {
  count: number
  acv: number
  closed_fiscal_quarter: string
  Team: string
}
import React from 'react'

import Statistic from '../../components/Statistic'
import Deposits from '../../components/Balance'
import TableOrders from '../../components/TableOrders'

const Dashboard = () => {
  return (
    <div className='w-[85%] mx-auto '>
      <div className="xl:flex justify-between mb-[30px]">
        <div className="">
          <Statistic />
        </div>
        <div className="">
          <Deposits />
        </div>
      </div>
      <div className="h-[36vh] lg:overflow-auto">
        <TableOrders/>
      </div>
    </div>
  )
}

export default Dashboard
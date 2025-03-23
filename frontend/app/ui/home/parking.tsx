import React from 'react'
import Parkingcongestion from '../parking/parkingcongestion'

export interface parkinginfo {
    congestion: string,
    available: number,
}
export default function Parking() {
    return (
        <div className='w-full flex flex-col md:flex-row p-5 gap-5'>
            <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
                <h1 className='w-full text-2xl font-bold '>주차 현황</h1>

                <Parkingcongestion title={"P1 주차장"} available={179} congestion={"여유"} />
                <Parkingcongestion title={"P2 장기 주차장"} available={179} congestion={"보통"} />
                <Parkingcongestion title={"화물주차장"} available={179} congestion={"혼잡"} />

            </div>
            <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
                <h1 className='w-full text-2xl font-bold '>예상 주차요금 조회</h1>
            </div>
        </div>
    )
}

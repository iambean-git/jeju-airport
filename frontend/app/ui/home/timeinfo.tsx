import React from 'react'

export default function Timeinfo() {
    return (
        <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
            <div>
                
            </div>
            <h1 className='text-2xl font-bold' >
                국내선 탑승시간     
            </h1>
            <h1 className='text-2xl font-bold'>
            예상 소요시간 안내  
            </h1>

            
            <h2 className='mt-2 text-sm text-gray-500 mb-5'>셀프 체크인부터 항공기 탑승까지 평균 체류시간</h2>
            
            <div><span className='text-5xl font-bold text-blue-700'>54</span>분</div>
            <div className='mt-5 font-semibold text-gray-700'>오후 09:00 기준</div>

        </div>
    )
}

import React from 'react'
import clsx from 'clsx';
const steps = [
    { id: 1, title: '공항도착(주차)', icon: '🧳' },
    { id: 2, title: '셀프 체크인', icon: '🧾' },
    { id: 3, title: '신분확인', icon: '🪪' },
    { id: 4, title: '보안검색', icon: '💼' },
    { id: 5, title: '탑승시간', icon: '💺' },
    { id: 6, title: '출발', icon: '✈️' },
];

const sectionCongestion = [
    { id: 1, status: '혼잡' },
    { id: 2, status: '여유' },
    { id: 3, status: '보통' },
];

const sectionTime = [
    { time: 16 },
    { time: 2 },
    { time: 36 },
    { time: 24 }
];

const congestColor = {
    "혼잡": "bg-red-500",
    "여유": "bg-yellow-500",
    "보통": "bg-green-500",
}

export default function BoardingTimeDetail() {
    const nodeStyle = clsx(
        'h-20 w-[160px] md:w-1/6 relative border-l-4 md:border-t-4 md:border-l-0'
        // 'h-20 w-2/3 relative border-l-4 border-gray-300'
    )
    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-center items-center h-full flex-row md:flex-col'>
                {/* 구간별 시간 */}
                <div className='flex flex-col mr-5 md:mr-0 md:flex-row md:w-full mt-12 md:mt-8'>
                    <div className='h-20 md:h-5 md:w-1/6'></div>
                    <div className='md:h-5 md:w-1/6'></div>
                    {sectionTime.map((time, idx) => (
                        <div key={`time${idx}`}
                            className='h-20  md:h-fit md:w-1/6 flex items-center justify-center translate-y-4.5'>
                            <span className={clsx('bg-gray-200 px-3 py-1 rounded-xl text-gray-700 text-xs', {
                                "text-red-600 bg-red-100": idx < 3 && sectionCongestion[idx].status == "혼잡",
                                "text-yellow-600 bg-yellow-100": idx < 3 && sectionCongestion[idx].status == "여유",
                                "text-green-600 bg-green-100": idx < 3 && sectionCongestion[idx].status == "보통",
                            })}> {time.time}분 </span>
                        </div>
                    ))}
                    <div className='h-20 md:h-5 md:w-1/6'></div>
                </div>
                {/* 구간 그림 */}
                <div className='flex md:w-full flex-col md:flex-row items-center md:mt-10 ' >
                    <div className='h-20 md:w-1/6 '></div>
                    {steps.map((s) => (
                        <div className={clsx(nodeStyle, {
                            "border-red-500": sectionCongestion[s.id - 2]?.status == "혼잡",
                            "border-yellow-500": sectionCongestion[s.id - 2]?.status == "여유",
                            "border-green-500": sectionCongestion[s.id - 2]?.status == "보통",
                            "border-gray-300": s.id == 5 || s.id == 1,
                            "border-white": s.id == 6
                        })} key={s.id}>
                            {/* 원형 숫자 */}
                            <div className='absolute -top-4 -left-4.5 rounded-full size-8 flex justify-center items-center border-2 border-gray-300 bg-white text-gray-500'>
                                {s.id}
                            </div>
                            {/* 타이틀 */}
                            <div className='absolute -top-3.5 left-6 md:top-10 md:left-0 flex items-center md:flex-col md:transform md:-translate-x-1/2'>
                                <span className="text-xl mr-2 md:mr-0 md:mb-1">{s.icon}</span>
                                <span className='md:text-sm'>{s.title}</span>
                            </div>
                        </div>
                    ))}


                </div>
            </div>


            {/* 혼잡도 범례 */}
            <div className="-mt-10 mb-5 flex items-center md:mt-16 space-x-4 justify-center z-10 ">
                <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">혼잡</span>
                </div>
                <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs">보통</span>
                </div>
                <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">여유</span>
                </div>
            </div>

            
        </div >

    )
}

import React from 'react'

export default function Parkingcongestion({
    title, available, congestion
}: {
    title: string;
    available: number;
    congestion: string;
}) {
    return (
        <div className='mb-10'>
            <p className='font-semibold mb-3'>
                {title}: {available}대 가능 {congestion==="만차" ? <span className='text-sm text-red-500'>(만차)</span>: <></>}
            </p>
            <div className='grid grid-cols-3 gap-5 lg:gap-10'>
                <div className={`h-2 md:h-3 ${congestion === "원활" ? "bg-blue-500" : "bg-gray-200"}`}></div>
                <div className={`h-2 md:h-3 ${congestion === "보통" ? "bg-amber-400" : "bg-gray-200"}`}></div>
                <div className={`h-2 md:h-3 ${congestion === "혼잡" ? "bg-red-500" : "bg-gray-200"}`}></div>
            </div>
            <div className='grid grid-cols-3 gap-5 lg:gap-10 mt-1'>
                <div className={`text-center ${congestion === "원활" ? "text-black" : "text-gray-300"}`}>여유</div>
                <div className={`text-center ${congestion === "보통" ? "text-black" : "text-gray-300"}`}>보통</div>
                <div className={`text-center ${congestion === "혼잡" ? "text-black" : "text-gray-300"}`}>혼잡</div>
            </div>
        </div>
    )
}

import React from 'react'

export default function Parkingcongestion({
    title, available, congestion
} : {
    title : string;
    available : number;
    congestion : string;
}) {
    return (
        <div className='mt-10'>
            <p className='font-semibold mb-3'>{title}: {available}대 가능</p>
            <div className='grid grid-cols-3 gap-5 lg:gap-10'>
                <div className={`h-2 md:h-3 ${congestion=="여유" ? "bg-blue-500" :  "bg-gray-200" }`}></div>
                <div className={`h-2 md:h-3 ${congestion=="보통" ? "bg-amber-400" :  "bg-gray-200" }`}></div>
                <div className={`h-2 md:h-3 ${congestion=="혼잡" ? "bg-red-500" :  "bg-gray-200" }`}></div>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-1'>
                <div className={`text-center ${congestion=="여유" ? "text-black": "text-gray-300"}`}>여유</div>
                <div className={`text-center ${congestion=="보통" ? "text-black": "text-gray-300"}`}>보통</div>
                <div className={`text-center ${congestion=="혼잡" ? "text-black": "text-gray-300"}`}>혼잡</div>
            </div>
        </div>
    )
}

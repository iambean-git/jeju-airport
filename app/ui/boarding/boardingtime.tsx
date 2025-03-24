import React from 'react'
import { BoardingTimeTotal } from '@/app/lib/definition';
import { IoReload } from "react-icons/io5";
export default function BoardingTime({ info }: { info: BoardingTimeTotal }) {
    const formatTime = (time: string) => {
        const [hour, minute] = time.split(":").map(Number);
        const period = hour < 12 ? "오전" : "오후";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // 12시간제로 변환
        return `${period} ${formattedHour}:${minute.toString().padStart(2, "0")}`;
    };
    return (
        <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
            <h1 className='text-xl md:text-2xl font-bold' >
                국내선 탑승시간
            </h1>
            <h1 className='text-xl md:text-2xl font-bold'>
                예상 소요시간 안내
            </h1>
            {/* 
            안내 미운영
            (21:30~06:30) */}
            <h2 className='mt-2 text-sm text-gray-500 mb-3 md:mb-5'>셀프 체크인부터 항공기 탑승까지 평균 체류시간</h2>

            <div className='text-sm md:text-base'>
                <span className='text-3xl md:text-5xl font-bold text-blue-700'>{info.timeall}</span>
                분
            </div>
            <div className='mt-3 md:mt-5 font-semibold text-gray-700 flex text-sm md:text-base'>
                <p>{formatTime(info.PRC_HR)} 기준 </p>
            </div>

        </div>
    )
}

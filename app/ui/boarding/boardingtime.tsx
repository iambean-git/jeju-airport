import React from 'react'
import { BoardingTimeTotal } from '@/app/lib/definition';
import { IoReload } from "react-icons/io5";
export default function BoardingTime({ info, mutate }: { info: BoardingTimeTotal, mutate: () => Promise<any> }) {
    const formatTime = (time: string) => {
        const [hour, minute] = time.split(":").map(Number);
        const period = hour < 12 ? "오전" : "오후";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // 12시간제로 변환
        return `${period} ${formattedHour}:${minute.toString().padStart(2, "0")}`;
    };

    const handleClick = async () => {
        try {
            await mutate(); // 비동기 호출
            // console.log("데이터가 성공적으로 새로고침됨!");
        } catch (error) {
            console.error("새로고침 중 오류 발생:", error);
        }
    };

    return (
        <div className='p-5 w-full h-full flex flex-col justify-center items-center'>

            <h1 className='text-2xl font-bold' >
                국내선 탑승시간
            </h1>
            <h1 className='text-2xl font-bold'>
                예상 소요시간 안내
            </h1>
            {/* 
            안내 미운영
            (21:30~06:30) */}
            <h2 className='mt-2 text-sm text-gray-500 mb-5'>셀프 체크인부터 항공기 탑승까지 평균 체류시간</h2>

            <div><span className='text-5xl font-bold text-blue-700'>{info.timeall}</span>분</div>
            <div className='mt-5 font-semibold text-gray-700 flex'>
                <p>{formatTime(info.PRC_HR)} 기준 </p>
                <button onClick={handleClick} className='ml-2'><IoReload /></button>
            </div>

        </div>
    )
}

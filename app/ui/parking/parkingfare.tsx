import { calculateParkingfare } from '@/app/lib/actions';
import { useState } from "react";
import { TIME_OPTIONS, DISCOUNT_TYPES } from '@/app/lib/utils';
import CalculatedFare from './calculatedfare';
// 현재 날짜를 Date 객체로 가져오기
const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화
    return today;
};

// input의 value 값으로 사용할 날짜 포맷팅 함수
const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function Parkingfare() {
    const [fare, setFare] = useState(0);
    const [carType, setCarType] = useState("소형");                 // 차량 종류
    const [startDateTime, setStartDateTime] = useState<Date>(getTodayDate());  // 입차시간
    const [endDateTime, setEndDateTime] = useState<Date | null>(null);          // 출차시간

    // 날짜 변경 핸들러 (start)
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newDateStr = e.target.value;
        if (!newDateStr) return;
        const [year, month, day] = newDateStr.split('-').map(Number);
        const updatedDate = new Date(startDateTime);
        updatedDate.setFullYear(year, month - 1, day);

        setStartDateTime(updatedDate);
    };

    // 시간 변경 핸들러 (start)
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [hours, minutes] = e.target.value.split(":").map(Number);
        const updatedDate = new Date(startDateTime);
        setStartDateTime((prev) => {
            const updatedDate = new Date(prev);
            updatedDate.setHours(hours, minutes);
            return updatedDate;
        });
    };

    // 날짜 변경 핸들러 (end)
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        if (!newDate) return;
        setEndDateTime((prev) => {
            const updatedDate = new Date(newDate);
            if (prev) updatedDate.setHours(prev.getHours(), prev.getMinutes());
            return updatedDate;
        });

    };

    // 시간 변경 핸들러 (end)
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [hours, minutes] = e.target.value.split(":").map(Number);
        setEndDateTime((prev) => {
            if (!prev) return null;
            const updatedDate = new Date(prev);
            updatedDate.setHours(hours, minutes);
            return updatedDate;
        });
    };

    // 유효성 검사 및 폼제출
    const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!endDateTime) {
            alert("출차일시를 입력하세요.");
            return;
        }

        if (startDateTime >= endDateTime) {
            alert("출차일시는 입차일시보다 이후여야 합니다.");
            return;
        }

        const formData = new FormData(e.currentTarget); // FormData 생성
        try {
            const fare = await calculateParkingfare(formData); // 서버 액션 호출 (비동기 처리)
            setFare(fare);
            // console.log("요금:", fare); // 결과 출력
        } catch (error) {
            console.error("요금 계산 오류:", error);
        }
    };


    const handleCarTypeChange = (type: string) => {
        setCarType(type);
    };

    return (

        <div className='w-full h-full flex flex-col  '>
            <form
                onSubmit={handleAction}
                className='grid grid-cols-1 xl:grid-cols-6 gap-5 p-5 bg-blue-50/70'>
                <div className='w-full flex flex-col xl:col-span-2'>
                    <label className='mb-2 font-semibold'>주차장</label>
                    <select name='parkinglotName'
                        className='border rounded p-2 text-base border-gray-300 bg-white'>
                        <option value="P1">P1주차장</option>
                        <option value="P2">P2장기주차장</option>
                        <option value="P3">화물주차장</option>
                    </select>
                </div>

                <div className='w-full flex flex-col xl:col-span-2 '>
                    <label className='mb-2 font-semibold'>선택</label>
                    <div className='flex'>
                        <button
                            type="button"
                            className={`border px-4 py-2 ${carType === "소형" ? "bg-white border-gray-800" : "bg-blue-100 border-gray-300"}`}
                            onClick={() => handleCarTypeChange("소형")}
                        >
                            소형
                        </button>
                        <button
                            type="button"
                            className={`border px-4 py-2 ${carType === "대형" ? "bg-white border-gray-800" : "bg-blue-100 border-gray-300"}`}
                            onClick={() => handleCarTypeChange("대형")}
                        >
                            대형
                        </button>
                        {/* 숨겨진 input */}
                        <input type="hidden" name="carType" value={carType} />
                    </div>
                </div>

                <div className='w-full flex flex-col xl:col-span-2'>
                    <label className='mb-2 font-semibold'>할인</label>
                    <select name='discount'
                        className='border rounded p-2 text-base border-gray-300 bg-white'>

                        {DISCOUNT_TYPES.map((discount, idx) =>
                            <option
                                key={`discount${idx}`}
                                value={discount.value}>
                                {discount.label}
                            </option>)}
                    </select>
                </div>


                <div className='w-full flex flex-col xl:col-span-3'>
                    <label className='mb-2 font-semibold'>입차일시</label>
                    <div className='grid grid-cols-5 gap-1'>
                        <input name='startDate' type="date"
                            value={formatDateForInput(startDateTime)}
                            onChange={handleStartDateChange}
                            className='col-span-3 border rounded p-2 text-base border-gray-300 bg-white ' />
                        <select id="startTime" name='startTime'
                            onChange={handleStartTimeChange}
                            className='col-span-2 border rounded p-2 text-base border-gray-300 bg-white'>
                            {TIME_OPTIONS.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='w-full flex flex-col xl:col-span-3'>
                    <label className='mb-2 font-semibold'>출차일시</label>
                    <div className='grid grid-cols-5 gap-1'>
                        <input name='endDate' type="date"
                            value={endDateTime ? formatDateForInput(endDateTime) : ""}
                            onChange={handleEndDateChange}
                            className='col-span-3 border rounded p-2 text-base border-gray-300 bg-white' />
                        <select id="endTime" name='endTime'
                            onChange={handleEndTimeChange}
                            className='col-span-2 border rounded p-2 text-base border-gray-300 bg-white'>
                            {TIME_OPTIONS.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='w-full xl:col-span-full flex justify-end'>
                    <button type='submit'
                        className='w-full xl:w-1/3 border rounded p-2 text-base border-gray-300 bg-blue-500 hover:bg-blue-600 text-white'
                    >
                        요금 조회
                    </button>
                </div>
            </form>

            {fare === 0 ? <></> : <CalculatedFare fare={fare} />}

        </div>
    )
}

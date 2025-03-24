import { calculateParkingfare } from '@/app/lib/actions';
import { useState } from "react";

export default function Parkingfare() {
    const discountTypes = [
        { value: 0, label: "일반" },
        { value: 1, label: "4.3 사건 유족" },
        { value: 2, label: "저공해 1,2종종" },
        { value: 3, label: "다자녀" },
        { value: 4, label: "4.3 생존 희생자" },
        { value: 5, label: "장애인 차량" },
        { value: 6, label: "국가 유공자(상이)" },
        { value: 7, label: "저공해 3종" },
        { value: 8, label: "경차" }

    ]
    const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget); // FormData 생성
        try {
            const fare = await calculateParkingfare(formData); // 서버 액션 호출 (비동기 처리)
            console.log("요금:", fare); // 결과 출력
        } catch (error) {
            console.error("요금 계산 오류:", error);
        }
    };

    const [carType, setCarType] = useState("소형"); // 기본값: "소형"
    const handleCarTypeChange = (type: string) => {
        setCarType(type);
    };

    return (

        <div className='w-full'>
            <form
                onSubmit={handleAction}
                className='grid grid-cols-1 xl:grid-cols-6 gap-5 bg-blue-50 p-5'>
                <div className='w-full flex flex-col xl:col-span-2'>
                    <label className='mb-2 font-semibold'>주차장</label>
                    <select name='parkinglotName'
                        className='border rounded p-2 text-base'>
                        <option value="P1">P1주차장</option>
                        <option value="P2">P2장기주차장</option>
                        <option value="P3">화물주차장</option>
                    </select>
                </div>

                <div className='w-full flex flex-col xl:col-span-2'>
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
                        className='border rounded p-2 text-base'>

                        {discountTypes.map((discount, idx) =>
                            <option
                                key={`discount${idx}`}
                                value={discount.value}>
                                {discount.label}
                            </option>)}
                    </select>
                </div>


                <div className='w-full flex flex-col xl:col-span-3'>
                    <label className='mb-2 font-semibold'>입차일시</label>
                    <div className='grid grid-cols-3 gap-1'>
                        <input name='startDate' type="date" className='border col-span-2 p-2' />
                        <select className='border p-2'></select>
                    </div>
                </div>

                <div className='w-full flex flex-col xl:col-span-3'>
                    <label className='mb-2 font-semibold'>출차일시</label>
                    <div className='grid grid-cols-3 gap-1'>
                        <input name='startDate' type="date" className='border col-span-2 p-2' />
                        <select className='border p-2'></select>
                    </div>
                </div>


                <button type='submit'>요금 계산</button>
            </form>
        </div>
    )
}

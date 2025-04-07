
export default function CalculatedFare({ fare }: { fare: number }) {
    return (
        <div className='h-fit px-5 flex justify-center items-center bg-blue-50/70 flex-col'>
            <div className="flex flex-wrap justify-center items-baseline border-t w-full text-center pt-10 border-t-gray-300 text-lg">
                <span className="whitespace-nowrap">예상 주차 요금은</span>
                <span className="whitespace-nowrap">
                    &nbsp;<span className="text-3xl font-semibold text-rose-600">{fare.toLocaleString()}</span> 원입니다.
                </span>
            </div>
            <p className=' text-sm mb-8 text-gray-400 pt-2 pb-4 '>※ 참고를 위한 것으로 실제 요금과 상이할 수 있습니다.</p>
        </div>
    )
}

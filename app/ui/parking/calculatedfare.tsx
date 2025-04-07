
export default function CalculatedFare({ fare }: { fare: number }) {
    return (
        <div className='h-fit px-5 flex justify-center items-center bg-blue-50/70'>
            <div className="flex flex-wrap justify-center items-baseline border-t w-full text-center py-10 border-t-gray-300 text-lg">
                <span className="whitespace-nowrap">예상 주차 요금은</span>
                <span className="whitespace-nowrap">
                    &nbsp;<span className="text-3xl font-semibold text-rose-600">{fare.toLocaleString()}</span> 원입니다.
                </span>
            </div>
        </div>
    )
}

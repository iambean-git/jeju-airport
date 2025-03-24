import { TaxiWaitingInfo } from '@/app/lib/definition'
import { FaTaxi } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export default function TaxiWaiting({ data }: { data: TaxiWaitingInfo }) {
    return (
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5'>
            {/* <section className='bg-blue-100 rounded-md p-3 text-blue-800'>
                <div className='flex flex-col sm:flex-row sm:items-center'>
                    <span className='mr-1 text-lg'><FaTaxi /></span>
                    <span className='text-sm'>대기 택시 수</span>
                </div>
                <div className='text-xl mt-1 font-bold'>{data.witTaxiCT} 대 </div>
            </section> */}

            <section className='bg-rose-100 rounded-md p-3 text-rose-800'>
                <div className='flex flex-col sm:flex-row sm:items-center'>
                    <span className='mr-1 text-lg'><FaTaxi /></span>
                    <span className='text-sm'>대기 택시 수</span>
                </div>
                <div className='text-xl mt-1 font-bold'>{data.witTaxiCT} 대 </div>
            </section>
            <section className='bg-orange-100 rounded-md p-3 text-orange-800'>
                <div className='flex flex-col sm:flex-row sm:items-center'>
                    <span className='mr-1 text-lg'><IoPerson /></span>
                    <span className='text-sm'>대기 승객 수</span>
                </div>
                <div className='text-xl mt-1 font-bold'>{data.witPaxCT} 명 </div>
            </section>

            <section className='bg-green-100 rounded-md p-3 text-green-800'>
                <div className='flex flex-col sm:flex-row sm:items-center'>
                    <span className='mr-1 text-lg'><FaTaxi /> </span>
                    <span className='text-sm'>예상 탑승 대기 시간 </span>
                </div>
                <div className='text-xl mt-1 font-bold'>{data.xptBdgMi} 분 </div>
            </section>
        </div>
    )
}

import Parkingcongestion from '../parking/parkingcongestion'
import { ParkingSkeleton } from '../skeletons';
import useSWR from 'swr';

interface parkinginfo {
    name : string;
    congestion: string;
    available: number;
}

export default function Parking() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    // // delay를 추가한 fetcher 함수
    // const fetcher = async (url: string) => {
    //     // 3초 지연 추가 (원하는 시간으로 조정 가능)
    //     await new Promise(resolve => setTimeout(resolve, 3000));
    //     return fetch(url).then((res) => res.json());
    // };
    
    const { data, error } = useSWR("/api/parking",
        fetcher,
        {
            refreshInterval: 1000 * 60 ,   //1분
            dedupingInterval: 1000 * 60 ,
        });
    // console.log("✅Parking data", data);
    if (error) {
        return <div className="h-full">주차차 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요. {error}</div>;  // 에러 메시지 출력
    }
    if (!data) return <ParkingSkeleton />;

    return (
        <div className='w-full flex flex-col md:flex-row p-5 gap-5'>
            <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
                <h1 className='w-full text-2xl font-bold '>주차 현황</h1>
                {data.map((i:parkinginfo)=><Parkingcongestion key={i.name} title={i.name} available={i.available} congestion={i.congestion} />)}

            </div>
            <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
                <h1 className='w-full text-2xl font-bold '>예상 주차요금 조회</h1>
            </div>
        </div>
    )
}

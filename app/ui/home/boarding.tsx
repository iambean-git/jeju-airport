import BoardingTime from "../boarding/boardingtime";
import BoardingTimeDetail from "../boarding/boardingtimeDetail";
import { BoardingSkeleton } from '../skeletons';

import useSWR from 'swr';

export default function Boarding() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR("/api/boarding",
        fetcher,
        {
            refreshInterval: 1000 * 60 * 5,   //5분
            dedupingInterval: 1000 * 60 * 5,
        });

    console.log("✅🛫Boarding Time data", data);

    if (error) {
        return <div className="h-full">탑승 소요시간간 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요. {error}</div>;  // 에러 메시지 출력
    }
    if (!data) return <BoardingSkeleton />;


    // if(!data.available){
    //     return(
    //         <div>이용정보 미제공</div>
    //     )
    // }
    return (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
            <section className="container h-auto md:h-72 font-b bg-white md:col-span-1">
                <BoardingTime info={data.total} />
            </section>
            <section className="container h-auto md:h-72 md:col-span-2">
                <BoardingTimeDetail time={data.boardingTime} congestion={data.boardingCongestion} />
            </section>
        </div>
    )
}

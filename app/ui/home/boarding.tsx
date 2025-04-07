import BoardingTime from "../boarding/boardingtime";
import BoardingTimeDetail from "../boarding/boardingtimeDetail";
import { BoardingSkeleton } from '../skeletons';

import useSWR from 'swr';

export default function Boarding() {
    // const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const fetcher = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("탑승 소요시간 데이터를 가져오는 데 실패했습니다.");
        }
        return res.json();
      };

    const { data, error } = useSWR("/api/boarding",
        fetcher,
        {
            refreshInterval: 1000 * 60 * 5,   //5분
            dedupingInterval: 1000 * 60 * 5,
        });

    // console.log("✅🛫Boarding Time data", data);

    if (error) {
        return <div className="h-full">탑승 소요시간 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요. {error}</div>;  // 에러 메시지 출력
    }
    if (!data) return <BoardingSkeleton />;

    return (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-5 w-full">
            <section className="boardContainer w-full h-auto md:h-72 md:col-span-1">
                <BoardingTime info={data.total} />
            </section>
            <section className="boardContainer h-auto md:h-72 md:col-span-2">
                <BoardingTimeDetail time={data.boardingTime} congestion={data.boardingCongestion} />
            </section>
        </div>
    )
}

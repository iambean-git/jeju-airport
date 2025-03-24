'use client'
import TaxiWaiting from "../taxi/taxiwaiting";
import { TaxiSkeleton } from "@/app/ui/skeletons";
import useSWR from 'swr';
import Taxicompany from "../taxi/taxicompany";

export default function Taxi() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/taxi",
    fetcher,
    {
      refreshInterval: 30000,   // 30,000ms = 30초
      dedupingInterval: 60000,
    });
  console.log("✅Taxi data", data);
  if (error) {
    return <div className="h-full">택시 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요. {error}</div>;  // 에러 메시지 출력
  }
  if (!data) return <TaxiSkeleton />;

  return (
    <div className="w-full flex flex-col p-5 md:p-10 max-w-[900px] ">
      <h1 className='w-full text-2xl font-bold mb-5'>택시 대기 현황</h1>
      <TaxiWaiting data={data} />

      <h1 className='w-full text-2xl font-bold mt-15 mb-5'>콜택시 업체 정보</h1>
      <Taxicompany/>
    </div>
  )
}

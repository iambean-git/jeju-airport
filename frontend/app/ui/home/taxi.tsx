'use client'
import { FaTaxi } from "react-icons/fa";
import { TaxiSkeleton } from "@/app/ui/skeletons";
import useSWR from 'swr';

export default function Taxi() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/taxi",
    fetcher,
    {
      refreshInterval: 30000,   // 30,000ms = 30초
      dedupingInterval: 60000,
    });
  // console.log("✅Taxi data", data);
  if (error) {
    return <div className="h-full">택시 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요. {error}</div>;  // 에러 메시지 출력
  }
  if (!data) return <TaxiSkeleton />;

  return (
    <div className="w-full">
      <div>대기 택시 수 : {data?.witTaxiCT} 대 </div>
      <div>대기 승객 수 : {data?.witPaxCT} 명</div>
      <div>예상 탑승 대기 시간 : {data?.xptBdgMi} 분</div>
    </div>
  )
}

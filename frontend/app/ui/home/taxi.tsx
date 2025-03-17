'use client'
import { fetchTaxi } from "../../lib/data";
import { FaTaxi } from "react-icons/fa";
import { useEffect, useState } from 'react';

export default function Taxi() {
  const [taxiData, setTaxiData] = useState<{ witTaxiCT: string; witPaxCT: string; xptBdgMi: string } | null>(null);
  const [error, setError] = useState<string | null>(null);  // 에러 메시지 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTaxi();
        setTaxiData(data);  // 데이터를 state에 저장
      } catch (error) {
        console.error("Error fetching taxi data:", error);
        setError("택시 데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.");  // 에러 메시지 설정
      }
    };

    fetchData();
  }, []);  // 빈 배열로 한 번만 실행되도록 설정

  if (error) {
    return <div className="h-full">{error}</div>;  // 에러 메시지 출력
  }

  return (
    <div className="w-full">
      <div>대기 택시 수 : {taxiData?.witTaxiCT}</div>
      <div>대기 승객 수 : {taxiData?.witPaxCT}</div>
      <div>예상 탑승 대기 시간 : {taxiData?.xptBdgMi} 분</div>
    </div>
  )
}

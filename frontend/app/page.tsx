'use client'
import { useState } from "react";
import clsx from "clsx";
import Taxi from "./ui/home/taxi";
import Timeinfo from "./ui/home/timeinfo";
import Congestion from "./ui/home/congestion";
import { Suspense } from 'react';
import { TaxiSkeleton } from "./ui/skeletons";
import TestCongestion from "./ui/home/test";
export default function Home() {
  const menuBtns = [
    { id: "taxi", label: "택시 정보" },
    { id: "menu1", label: "메뉴 1" },
    { id: "menu2", label: "메뉴 2" },
  ];
  const [selected, setSelected] = useState("taxi");

  return (
    <div className="bg-[#f3f4f6]">
      <header className="h-20 p-5 max-w-[1536px] mx-auto flex items-center justify-center">
        <div className="w-full text-2xl font-bold">
          About JEJU Airport
        </div>
      </header>
      <main className="flex w-full flex-col min-h-screen max-w-[1536px] mx-auto 2xl px-5">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
          <section className="container h-auto md:h-72 font-b bg-white md:col-span-1">
            <Timeinfo />
          </section>
          <section className="container h-auto md:h-72 md:col-span-2">
            <Congestion />
          </section>
        </div>
        {/* 안내 멘트 */}
        <div className='text-xs text-start pl-5 mt-5 md:mt-2'>
          <ul className='list-disc '>
            <li>
              <p>
                <span className='text-rose-600'>항공권 셀프 체크인 및 수하물 위탁 가능 시간</span>은 항공사별 정책에 따라 달라질 수 있으며, 일반적으로
                <span className='text-rose-600'> 국내선 항공기는 출발 예정 시각 30분전까지</span> 가능함에 유의하시기 바랍니다.
              </p>
            </li>
            <li className='mt-1'>
              <p>
                본 서비스는
                <span className='text-rose-600'> 탑승수속 구간별 여객이 체류하는 평균시간을 실시간으로 안내</span>하는 것으로,
                <span className='text-rose-600'> 개개인의 실제 소요시간과 차이가 있을 수 있습니다.</span>
              </p>
            </li>
          </ul>
        </div>

        {/* 메뉴 버튼 */}
        <div className="bg-slate-300 mt-5 rounded-lg grid grid-cols-3 px-1.5 gap-2">
          {menuBtns.map(({ id, label }) => (
            <button
              key={id}
              className={clsx(
                "w-full my-2 py-2 rounded-lg",
                selected === id
                  ? "text-blue-600 bg-white"
                  : "text-gray-700 hover:bg-white/[0.2] hover:text-blue-600"
              )}
              onClick={() => setSelected(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="bg-white mt-5 min-h-80" >

          <Suspense fallback={<TaxiSkeleton />}>
            <Taxi />
          </Suspense>
        </div>

      </main>
      <footer className="h-36 bg-white flex flex-col justify-center items-center">
        <div>Developed by iambean</div>
        <div className="text-gray-500 text-sm">© 2025 All rights reserved</div>
      </footer>
    </div>
  );
}

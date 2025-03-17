'use client'
import { useState } from "react";
import clsx from "clsx";
import Taxi from "./ui/home/taxi";
import { Suspense } from 'react';
import { TaxiSkeleton } from "./ui/skeletons";
export default function Home() {
  const menuBtns = [
    { id: "taxi", label: "택시 정보" },
    { id: "menu1", label: "메뉴 1" },
    { id: "menu2", label: "메뉴 2" },
  ];
  const [selected, setSelected] = useState("taxi");

  return (
    <div className="bg-[#f3f4f6]">
      <header className="h-20 bg-red-50 ">
        제주공항 관련 정보 모음
      </header>
      <main className="flex w-full flex-col min-h-screen max-w-[1536px] mx-auto 2xl">
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-5">
          <section className="h-72 bg-red-100">section1</section>
          <section className="h-72 bg-green-100">section1</section>
        </div>
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

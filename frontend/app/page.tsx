import Image from "next/image";
import Taxi from "./ui/home/taxi";
import { Suspense } from 'react';
import { TaxiSkeleton } from "./ui/skeletons";
export default function Home() {
  return (
    <div className="bg-[#f3f4f6]">
      <header>

      </header>
      <main className="flex flex-col min-h-screen">
        <Suspense fallback={<TaxiSkeleton/>}>
          <Taxi/>
        </Suspense>
      </main>
      <footer className="h-36 bg-white flex flex-col justify-center items-center">
        <div>Developed by iambean</div>
        <div className="text-gray-500 text-sm">© 2025 All rights reserved</div>
      </footer>
    </div>
  );
}

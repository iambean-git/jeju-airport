
export function TaxiSkeleton() {
  return (
    <div className="w-full flex flex-col p-5 md:p-10 max-w-[900px] animate-pulse">
      {/* 택시 대기 현황 헤더 스켈레톤 */}
      <div className="w-48 h-8 bg-gray-200 rounded mb-5"></div>

      {/* 택시 대기 현황 카드 스켈레톤 */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5'>
        <div className='bg-gray-100 rounded-md p-3'>
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='w-6 h-6 bg-gray-200 rounded mr-1'></div>
            <div className='w-24 h-4 bg-gray-200 rounded mt-1 sm:mt-0'></div>
          </div>
          <div className='w-16 h-7 bg-gray-200 rounded mt-3'></div>
        </div>

        <div className='bg-gray-100 rounded-md p-3'>
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='w-6 h-6 bg-gray-200 rounded mr-1'></div>
            <div className='w-24 h-4 bg-gray-200 rounded mt-1 sm:mt-0'></div>
          </div>
          <div className='w-16 h-7 bg-gray-200 rounded mt-3'></div>
        </div>

        <div className='bg-gray-100 rounded-md p-3'>
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='w-6 h-6 bg-gray-200 rounded mr-1'></div>
            <div className='w-28 h-4 bg-gray-200 rounded mt-1 sm:mt-0'></div>
          </div>
          <div className='w-16 h-7 bg-gray-200 rounded mt-3'></div>
        </div>
      </div>

      {/* 콜택시 업체 정보 헤더 스켈레톤 */}
      <div className="w-48 h-8 bg-gray-200 rounded mt-15 mb-5"></div>

      {/* 정보 박스 스켈레톤 */}
      <div className="w-full h-28 bg-gray-100 rounded-lg mb-5"></div>

      {/* 테이블 헤더 스켈레톤 */}
      <div className="hidden sm:flex w-full h-12 bg-gray-100 rounded mb-2"></div>

      {/* 테이블 로우 스켈레톤 - 데스크탑 */}
      <div className="hidden sm:block">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="w-full h-14 bg-gray-50 border-b border-gray-100 mb-1"></div>
        ))}
      </div>

      {/* 모바일 그리드 스켈레톤 */}
      <div className="grid grid-cols-2 sm:hidden w-full gap-3">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="h-24 border border-gray-200 rounded-lg p-3">
            <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-28 h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-32 h-5 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BoardingSkeleton() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
      <section className="container h-auto md:h-72 font-b bg-white md:col-span-1">
        <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-xl md:text-2xl font-bold' >
            국내선 탑승시간
          </h1>
          <h1 className='text-xl md:text-2xl font-bold'>
            예상 소요시간 안내
          </h1>
          <h2 className='mt-2 text-sm text-gray-500 mb-5 bg-gray-100 animate-pulse w-4/5 h-3'></h2>
          <div className='bg-gray-200 animate-pulse w-1/2 h-9 rounded'></div>
          <div className='mt-5 bg-gray-100 animate-pulse w-1/2 h-3 rounded'>
          </div>
        </div>
      </section>
      <section className="container h-auto md:h-72 md:col-span-2">
        <div className='flex flex-col justify-center items-center h-full my-10 md:my-5'>
          {/* 그림 영역 */}
          <div className='bg-gray-200 animate-pulse w-4/5 h-96 md:h-32 rounded'></div>
          {/* 혼잡도 범례 */}
          <div className="bg-gray-100 animate-pulse w-2/5 h-10 rounded md:mt-5 mt-10 "></div>

        </div >
      </section>
    </div>
  );
}

export function ParkingSkeleton() {
  // 로딩 중에 표시할 가상 주차장 아이템 개수 (실제 데이터와 비슷하게 3개로 설정)
  const skeletonItems = [1, 2, 3];

  return (
    <div className='w-full flex flex-col md:flex-row p-5 gap-5'>
      <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
        <h1 className='w-full text-2xl font-bold'>주차 현황</h1>
        {skeletonItems.map((item) => (
          <div key={item} className='mt-10'>
            {/* 제목과 주차 가능 대수 스켈레톤 */}
            <div className='mb-3 bg-gray-200 animate-pulse h-6 w-2/3 rounded'></div>

            {/* 상태 바 스켈레톤 */}
            <div className='grid grid-cols-3 gap-5 lg:gap-10'>
              <div className='h-2 md:h-3 bg-gray-200 animate-pulse'></div>
              <div className='h-2 md:h-3 bg-gray-200 animate-pulse'></div>
              <div className='h-2 md:h-3 bg-gray-200 animate-pulse'></div>
            </div>

            {/* 상태 텍스트 스켈레톤 */}
            <div className='grid grid-cols-3 gap-5 lg:gap-10 mt-1'>
              <div className='text-center bg-gray-200 animate-pulse h-5 rounded'></div>
              <div className='text-center bg-gray-200 animate-pulse h-5 rounded'></div>
              <div className='text-center bg-gray-200 animate-pulse h-5 rounded'></div>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full md:w-1/2 border rounded-lg border-gray-300 p-5 md:p-10 flex flex-col'>
        <h1 className='w-full text-2xl font-bold'>예상 주차요금 조회</h1>
        {/* 예상 주차요금 조회 영역 스켈레톤 (현재 실제 구현은 없지만 공간만 확보) */}
        <div className='mt-10 h-48 bg-gray-200 animate-pulse rounded'></div>
      </div>
    </div>
  );
}

export function CalculatedFareSkeleton() {
  return (
    <div className='h-fit px-5 flex justify-center items-center bg-blue-50/70 flex-col'>
      <div className="flex flex-wrap justify-center items-baseline border-t w-full text-center pt-10 border-t-gray-300 text-lg">
        <span className="whitespace-nowrap">예상 주차 요금은</span>
        <span className="whitespace-nowrap">
          &nbsp;<span className="animate-pulse bg-gray-300 rounded-md h-8 w-24 inline-block"></span> 원입니다.
        </span>
      </div>
      <p className='text-sm mb-8 text-gray-400 pt-2 pb-4 animate-pulse'>※ 로딩 중...</p>
    </div>
  )
}

export function TaxiSkeleton() {
  return (
    <div>
      택시 로딩중...
    </div>
  );
}

export function BoardingSkeleton() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
      <section className="container h-auto md:h-72 font-b bg-white md:col-span-1">
        <div className='p-5 w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold' >
            국내선 탑승시간
          </h1>
          <h1 className='text-2xl font-bold'>
            예상 소요시간 안내
          </h1>
          <h2 className='mt-2 text-sm text-gray-500 mb-3 md:mb-5 bg-gray-100 animate-pulse w-4/5 h-3'></h2>
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
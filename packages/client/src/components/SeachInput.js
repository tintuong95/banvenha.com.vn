import React from 'react'

export default function SeachInput() {
  return (
			<>
				<div className='flex mt-8 transform transition duration-500   hover:scale-105'>
					<form className='w-6/12 m-auto'>
						<label
							className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
							htmlFor='default-search'>
							TÌM KIẾM
						</label>
						<div className='relative '>
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<svg
									aria-hidden='true'
									className='w-5 h-5 text-gray-500 dark:text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
								</svg>
							</div>
							<input
								type='search'
								id='default-search'
								className='block w-full p-4 pl-10 text-center text-gray-900 border shadow-lg border-rose-400  rounded-lg outline-none  '
								placeholder='Nhập tên bản vẽ '
								required
							/>
							<button
								type='submit'
								className='text-white absolute right-2.5 bottom-2 bg-sky-300 border border-sky-400 p-2 px-4 rounded-lg '>
								Tìm kiếm
							</button>
						</div>
					</form>
				</div>
				{/* <div className='flex gap-3 my-2 text-slate-400 text-sm w-11/12 m-auto'>
					Ví dụ : <span className='underline'>Nhà cấp 4 5x10</span>,
					<span className='underline'>Nhà cấp 4 5x10</span>,
					<span className='underline'>Nhà cấp 4 5x10</span>,
					<span className='underline'>Nhà cấp 4 5x10</span>
					...
				</div> */}
			</>
		);
}

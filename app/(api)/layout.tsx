import React, { ReactNode } from 'react'
import LogoBold from '@/components/svgs/LogoBold'
import Image from 'next/image'
import LogoBottomText from '@/components/svgs/LogoBottomText'

const layout = ({ children } : { children : ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
        <section className='hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5 '>
            <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12 '>
                <LogoBold height = {150} width = {300}  className='h-auto' />
                <div className='space-y-5 text-white'>
                    <h1 className='h1'>
                        Manage your files the best way
                    </h1>
                    <p className='body-1'>
                        This is the place where you can store all the documents.
                    </p>
                </div>
                <Image src="/assets/images/files.png" alt='files' width={342} height={342} className='transition-all hover:rotate-2 hover:scale-105' />
            </div>
        </section>
        <section className='flex flex-1 flex-col items-center bg-brand-light p-4 py-10 lg:justify-center lg:p-10 lg:py-10'>
            <div className='mb-16 lg:hidden'>
                <LogoBottomText textFill='#f1bbd5' width={224} height={300} className='h-auto w-[100px] lg:w-[124px] ' />
            </div>
            {children}
        </section>
    </div>
  )
}

export default layout
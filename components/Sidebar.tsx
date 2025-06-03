"use client"
import Link from 'next/link'
import React from 'react'
import LogoBold from './svgs/LogoBold'
import LogoBrand from './svgs/LogoBrand'
import { AvatarURL, navItems } from '@/constants'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
const Sidebar = ({ name ,  email } : { name : string , email : string }) => {
  const pathName = usePathname();
  return (
    <aside className='sidebar'>
        <Link href="/" >
          <LogoBold logoFill='#FA7275' textFill='#FA7275' width={160} height={50} className='hidden h-auto lg:block ' />
          <LogoBrand logoFill='#FA7275' width={52} height={52} className='lg:hidden' />
        </Link>
        <nav className='sidebar-nav'>
          <ul className='flex flex-1 flex-col gap-6'>
            {navItems.map(({ name , icon , url }) => (
              <Link key={name} href={url} className='lg:w-full'>
                <li className={cn("sidebar-nav-item" , pathName === url && 'shad-active')}>
                  <Image src={icon} alt='logo' width={24} height={24} className={cn("nav-icon" , pathName === url && 'nav-icon-active')} />
                  <p className='hidden lg:block'>{name} </p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <Image src="/assets/images/files-2.png" alt='logo' width={506} height={418} className='w-full' />
        <div className='sidebar-user-info'>
          <Image src={AvatarURL} alt='Avatar' width={44} height={44} className='sidebar-user-avatar' />
          <div className='hidden lg:block'>
            <p className='subtitle-2 capitalize'>{name} </p>
            <p className='caption'>{email} </p>
          </div>
        </div>
    </aside>
  )
}

export default Sidebar
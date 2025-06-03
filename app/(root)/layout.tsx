import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const Layout = async ({ children } : { children : ReactNode}) => {
  const user = await getCurrentUser();
  if(!user) redirect('/sign-in');
  return (
    <main className='flex h-screen'>
      <Sidebar name={user.fullName} email={user.email} />
        <section className='flex h-full flex-1 flex-col '>
          <MobileNavigation name={user.fullName} email={user.email} ownerId={user.$id} accountId={user.accountId} />
          <Header ownerId={user.$id} accountId={user.accountId} />
            <div className='main-content remove-scrollbar'>
              {children}
            </div>
        </section>
        <Toaster />
    </main>
  )
}

export default Layout
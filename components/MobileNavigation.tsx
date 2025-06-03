"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LogoBold from "./svgs/LogoBold";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AvatarURL, navItems } from "@/constants";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = ({ name ,  email , ownerId , accountId } : { name : string , email : string , ownerId : string , accountId : string }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  return (
    <header className="mobile-header">
      <LogoBold
        width={120}
        height={52}
        logoFill="#FA7275"
        textFill="#FA7275"
        className="h-auto lg:hidden"
      />
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger>
          <Image src="/assets/icons/menu.svg" alt="menu" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image src={AvatarURL} alt="Avatar" width={44} height={44} className="header-user-avatar" />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{name} </p>
                <p className="caption">{email} </p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navItems.map(({ name , icon , url }) => (
              <Link key={name} href={url} className='lg:w-full'>
                <li className={cn("mobile-nav-item" , pathName === url && 'shad-active')}>
                  <Image src={icon} alt='logo' width={24} height={24} className={cn("nav-icon" , pathName === url && 'nav-icon-active')} />
                  <p>{name} </p>
                </li>
              </Link>
            ))}
              </ul>
            </nav>

            <div className="flex flex-col justify-between gap-5 pb-5">
              <FileUploader ownerId={ownerId} accountId={accountId} />
              <Button type='submit' className='mobile-sign-out-button' onClick={async () => await signOutUser()} >
                    <Image src="/assets/icons/logout.svg" alt='logo' width={24} height={24} />
                    <p>Logout</p>
                </Button>
            </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;

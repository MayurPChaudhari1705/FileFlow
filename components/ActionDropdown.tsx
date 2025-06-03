"use client";
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Models } from 'node-appwrite'
import Image from 'next/image';
import { actionsDropdownItems } from '@/constants';
import Link from 'next/link';
import { constructDownloadUrl } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';
const ActionDropdown = ({ file } : { file : Models.Document}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);

  }

  const handleAction = async () => {
    if(!action) return;
    setIsLoading(true);
    
  }
  const renderDialogContent = () => {
    if(!action) return null;
    const { value , label } = action;
    return (
      <DialogContent className='shad-dialog button bg-white'>
    <DialogHeader className='flex flex-col gap-3'>
      <DialogTitle className='text-center text-light-100'>
        {label}
      </DialogTitle>
      {value === "rename" && <Input value={name} onChange={(e) => setName(e.target.value) } ></Input>}
    </DialogHeader>
    {["rename" , "share" , "delete"].includes(value) && (
      <DialogFooter className='flex flex-col gap-3 md:flex-row'>
        <Button className='modal-cancel-button' onClick={closeAllModals}>Cancel</Button>
        <Button onClick={handleAction} className='modal-submit-button'>
          <p className='capitalize'>
            {label}
          </p>
          {
            isLoading && (
              <Image src="/assets/icons/loader.svg" alt='Loader' width={24} height={24} className='animate-spin' />
            )
          }
        </Button>
      </DialogFooter>
    )}
  </DialogContent>
    )
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}  >
  <DropdownMenuTrigger className='shad-no-focus'>
    <Image src="/assets/icons/dots.svg" alt='dots' width={34} height={34} className='cursor-pointer'  />
  </DropdownMenuTrigger>
  <DropdownMenuContent className='bg-white'>
    <DropdownMenuLabel className='max-w-[200px] truncate font-semibold'>
      {file.name}
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    {actionsDropdownItems.map((actionItem) => (
      <DropdownMenuItem key={actionItem.value} onClick={() => {
        setAction(actionItem);
        if(["rename", "share" , "delete" , "details"].includes(actionItem.value)){
          setIsModalOpen(true);
        }
      }}  >
       {actionItem.value === "download" ? (
         <Link href={constructDownloadUrl(file.bucketFileId)} download={file.name} className='flex items-center gap-2' >
        <Image src={actionItem.icon} alt={actionItem.label} width={30} height={30} />
        {actionItem.label}
        </Link>
       ) : (
        <div className='flex items-center gap-2'>
           <Image src={actionItem.icon} alt={actionItem.label} width={30} height={30} />
        {actionItem.label}
        </div>
       )}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
{renderDialogContent()}
</Dialog>
  )
}

export default ActionDropdown
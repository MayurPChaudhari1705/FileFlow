import { Models } from 'node-appwrite'
import React, { Dispatch, SetStateAction } from 'react'
import ImageThumbnail from './ImageThumbnail'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
interface Props {
    file : Models.Document,
    onInputChange : Dispatch<SetStateAction<string[]>>,
    onRemove : ( email : string ) => void
}
const ShareInput = ({ file , onInputChange , onRemove } : Props ) => {
  return (
    <>
    <ImageThumbnail file={file} />
    <div className='share-wrapper'>
        <p className='subtitle-2 pl-1 text-light-100'>
            Share file with other users 
        </p>
        <Input type='email' placeholder='Enter email address' onChange={ (e) => onInputChange(e.target.value.trim().split(","))} className='share-input-field' />
        <div className='pt-4'>
            <div className='flex justify-between'>
                <p className='subtitle-2 text-light-100'>
                    Shared with
                </p>
                <p className='subtitle-2 text-light-100'>
                    {file.users.length} users
                </p>
            </div>
            <ul className='pt-2'>
                {file.users.map(( email : string ) => (
                    <li key={email} className='flex items-center justify-between'>
                        <p className='subtitle-2'>
                            {email}
                        </p>
                        <Button onClick={() => onRemove(email)} className='share-remove-user' >
                            <Image src="/assets/icons/remove.svg" alt='remove' width={24} height={24} className='remove-icon' />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    </>
  )
}

export default ShareInput
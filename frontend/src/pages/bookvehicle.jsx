import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'

const Bookvehicle= () => {
  return (
    <div className='flex mt-14 justify-center'>
      <Card className='h-full pb-16 w-9/12 bg-neutral-200'>
        <CardTitle className='flex justify-center mt-10 text-slate-950'>Book your desired Vehicle</CardTitle>
        <CardDescription className='flex justify-center mt-2'>Make sure to fill all the details carefully.Please contact for any queries</CardDescription>

        <div className='grid grid-cols-2'>
        <form>
          <Label className='mt-6'>Vehicle Type</Label>
          <Input placeholder='Vehicle type'/>
        </form>
        </div>
        
      </Card>
    </div>
    
  )
}

export default Bookvehicle;
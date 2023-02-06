import { Button } from 'antd'
import React from 'react'
import BaseStep from '../../../components/BaseStep'
import CreateStepFour from './Create/CreateStepFour'
// import CreateStepThree from './CreateStep/CreateStepThree'
// import CreateStepFirst from './CreateStep/CreateStepFirst'
// import CreateStepTwo from './CreateStep/CreateStepTwo'

export default function ProductCreate() {
  return (
    <div >
          <div className='w-2/4 m-auto mb-5'>
              <BaseStep />
         </div>
          <div className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'>
        <CreateStepFour />
         </div>
      <div className='w-2/4 m-auto mb-5 flex justify-between mt-5'>
        <Button>Previous</Button>
        <Button>Next</Button>
         </div>
    </div>
  )
}

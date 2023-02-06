import { Button } from 'antd'
import React from 'react'
import BaseStep from '../../../components/BaseStep'
// import CreateStepFour from '../Product/CreateStep/CreateStepFour'

// import CreateStepThree from './CreateStep/CreateStepThree'
import CreateStepFirst from './Create/CreateStepFirst'
// import CreateStepTwo from './CreateStep/CreateStepTwo'

export default function NewsCreate() {
  return (
    <div >
          <div className='w-2/4 m-auto mb-5'>
              <BaseStep />
         </div>
          <div className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'>
        <CreateStepFirst />
         </div>
      <div className='w-2/4 m-auto mb-5 flex justify-between mt-5'>
        <Button>Previous</Button>
        <Button>Next</Button>
         </div>
    </div>
  )
}

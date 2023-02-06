import { Button } from 'antd'
import React, { useState } from 'react'
import BaseStep from '../../../components/BaseStep'
import CreateStepFirst from './Create/CreateStepFirst'
import CreateStepFour from './Create/CreateStepFour'
import CreateStepThree from './Create/CreateStepThree'
import CreateStepTwo from './Create/CreateStepTwo'




export default function ProductCreate() {
  const [step, setStep] = useState(1)

  const renderStepCreate = () => {
    if (step == 1) return <CreateStepFirst />
    if (step == 2) return <CreateStepTwo />
    if (step == 3) return <CreateStepThree />
    if (step == 4) return <CreateStepFour />
  }

  return (
    <div >
      <div className='w-2/4 m-auto mb-5'>
        <BaseStep current={step}/>
      </div>
      <div className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'>
        {renderStepCreate()}
      </div>
      <div className='w-2/4 m-auto mb-5 flex justify-between mt-5'>
        <Button onClick={() => { setStep(step-1) }}>Previous</Button>
        <Button onClick={() => { setStep(step + 1) }}>Next</Button>
      </div>
    </div>
  )
}

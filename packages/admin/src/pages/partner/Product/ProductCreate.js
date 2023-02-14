import {Button} from 'antd';
import React, {useState} from 'react';
import BaseStep from '../../../components/BaseStep';
import CreateStepFirst from './Create/CreateStepFirst';
import CreateStepFour from './Create/CreateStepFour';
import CreateStepThree from './Create/CreateStepThree';
import CreateStepTwo from './Create/CreateStepTwo';

export default function ProductCreate() {
	const [stepPage, setStepPage] = useState(1);
	const [dataProduct, setDataProduct] = useState({
		name: null,
		description: null,
		content: null,
		group_id: null,
		file: null,
		state: null,
	});
	const onNextStep = () => {
		const step = stepPage < 4 ? stepPage + 1 : stepPage;
		setStepPage(step);
	};
	const onPreviousStep = () => {
		const step = stepPage > 1 ? stepPage - 1 : stepPage;
		setStepPage(step);
	};
	const renderStepCreate = (stepPage) => {
		if (stepPage == 1)
			return (
				<CreateStepFirst
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataProduct={dataProduct}
					setDataProduct={setDataProduct}
				/>
			);
		else if (stepPage == 2)
			return (
				<CreateStepTwo
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataProduct={dataProduct}
					setDataProduct={setDataProduct}
				/>
			);
		else if (stepPage == 3)
			return (
				<CreateStepThree
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataProduct={dataProduct}
					setDataProduct={setDataProduct}
				/>
			);
		else if (stepPage == 4)
			return (
				<CreateStepFour
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataProduct={dataProduct}
					setDataProduct={setDataProduct}
				/>
			);
	};

	return (
		<div>
			<div className='w-2/4 m-auto mb-5'>
				<BaseStep current={stepPage} />
			</div>
			<div className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'>
				{renderStepCreate(stepPage)}
			</div>
		</div>
	);
}

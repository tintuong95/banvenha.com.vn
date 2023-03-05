import {Button} from 'antd';
import React, {useState} from 'react';
import BaseStep from '../../../components/step';
import CreateStepFirst from './Create/CreateStepFirst';
import CreateStepFour from './Create/CreateStepFour';
import CreateStepThree from './Create/CreateStepThree';
import CreateStepTwo from './Create/CreateStepTwo';

export default function ProductCreate() {
	const [stepPage, setStepPage] = useState(1);
	const [dataProduct, setDataProduct] = useState({
		title: null,
		description: null,
		content: null,
		groupId: null,
		price:null,
		sale:null,
		photo: null,
		photoList: null,
	});
	const onNextStep = () => {
		const step = stepPage < 5 ? stepPage + 1 : stepPage;
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
			<div className='w-2/4 m-auto mb-5' style={{minWidth: 825}}>
				<BaseStep current={stepPage} />
			</div>
			<div
				className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'
				style={{minWidth: 825}}>
				{renderStepCreate(stepPage)}
			</div>
		</div>
	);
}

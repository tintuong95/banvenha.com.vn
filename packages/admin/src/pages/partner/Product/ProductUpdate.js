import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getProductDetails} from '../../../apis/product';
import BaseStep from '../../../components/step';
import UpdateStepFirst from './Update/UpdateStepFirst';
import UpdateStepFour from './Update/UpdateStepFour';
import UpdateStepThree from './Update/UpdateStepThree';
import UpdateStepTwo from './Update/UpdateStepTwo';

export default function ProductUpdate() {
	const {id} = useParams();
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
		const step = stepPage < 5 ? stepPage + 1 : stepPage;
		setStepPage(step);
	};

	const onPreviousStep = () => {
		const step = stepPage > 1 ? stepPage - 1 : stepPage;
		setStepPage(step);
	};

	const fetchProductDetails = (id) => {
		getProductDetails(id)
			.then((result) => {
				setDataProduct(result.data);
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const renderStepUpdate = (stepPage) => {
		if (stepPage == 1)
			return (
				<UpdateStepFirst
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
				<UpdateStepTwo
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
				<UpdateStepThree
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
				<UpdateStepFour
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataProduct={dataProduct}
					setDataProduct={setDataProduct}
				/>
			);
	
	};
	useEffect(() => {
		fetchProductDetails(id);
	}, [id]);
	
	return (
		<div>
			<div className='w-2/4 m-auto mb-5' style={{minWidth: 825}}>
				<BaseStep current={stepPage} />
			</div>
			<div
				className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'
				style={{minWidth: 825}}>
				{renderStepUpdate(stepPage)}
			</div>
		</div>
	);
}

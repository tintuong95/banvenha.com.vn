
import React, {useState} from 'react';
import BaseStep from '../../../components/step';
import CreateStepFirst from './Create/CreateStepFirst';
import CreateStepThree from './Create/CreateStepThree';
import CreateStepTwo from './Create/CreateStepTwo';
export default function NewsCreate() {
	const [stepPage, setStepPage] = useState(1);
	const [dataNews, setDataNews] = useState({
		title: null,
		description: null,
		content: null,
		groupId: null,
		photo: null,
		published: null,
	});

	const onNextStep = () => {
		const step = stepPage < 3 ? stepPage + 1 : stepPage;
		setStepPage(step);
	};
	const onPreviousStep = () => {
		const step = stepPage > 1 ? stepPage - 1 : stepPage;
		setStepPage(step);
	};

	const renderStepPage = (page) => {
		if (page === 1)
			return (
				<CreateStepFirst
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataNews={dataNews}
					setDataNews={setDataNews}
				/>
			);
		else if (page === 2)
			return (
				<CreateStepTwo
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataNews={dataNews}
					setDataNews={setDataNews}
				/>
			);
		else if (page === 3)
			return (
				<CreateStepThree
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataNews={dataNews}
					setDataNews={setDataNews}
				/>
			);
		// else if (page === 4) return <CreateStepFour />;
	};

	return (
		<div>
			<div className='w-2/4 m-auto mb-5' style={{minWidth: 825}}>
				<BaseStep current={stepPage} />
			</div>
			<div className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'>
				{renderStepPage(stepPage)}
			</div>
		</div>
	);
}

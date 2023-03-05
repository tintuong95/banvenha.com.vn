import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getBlogDetailsApi, updateBlog} from '../../../apis/news';
import BaseStep from '../../../components/step';
import UpdateStepFirst from './Update/UpdateStepFirst';
import UpdateStepThree from './Update/UpdateStepThree';
import UpdateStepTwo from './Update/UpdateStepTwo';
export default function NewsUpdate() {
	const {id} = useParams();
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

	const fetchNewsDetails = (id) => {
		getBlogDetailsApi(id)
			.then((result) => {
				setDataNews(result.data)
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};


	const renderStepPage = (page) => {
		if (page === 1)
			return (
				<UpdateStepFirst
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
				<UpdateStepTwo
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
				<UpdateStepThree
					onNextStep={onNextStep}
					onPreviousStep={onPreviousStep}
					stepPage={stepPage}
					setStepPage={setStepPage}
					dataNews={dataNews}
					setDataNews={setDataNews}
				/>
			);
		// else if (page === 4) return <UpdateStepFour />;
	};

	useEffect(() => {
		fetchNewsDetails(id);
		console.log("dataNews: ", dataNews)
	}, [id]);
	return (
		<div>
			<div className='w-2/4 m-auto mb-5 ' style={{minWidth: 825}}>
				<BaseStep current={stepPage} />
			</div>
			<div
				className='bg-white w-2/4 m-auto p-10 rounded-md shadow-sm'
				style={{minWidth: 825}}>
				{renderStepPage(stepPage)}
			</div>
		</div>
	);
}

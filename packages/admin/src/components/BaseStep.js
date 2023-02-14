import { Popover, Steps } from 'antd';
import PropTypes from 'prop-types';


const customDot = (dot, { status, index }) => (
    <Popover
        content={
            <span>
                step {index} status: {status}
            </span>
        }
    >
        {dot}
    </Popover>
);
const description = '';
const BaseStep = ({current}) => (
    <Steps
        current={current-1}
        progressDot={customDot}
        items={[
            {
                title: 'Nhập thông tin',
                description,
            },
            {
                title: 'Nhập nội dung',
                description,
            },
            {
                title: 'Xác nhận',
                description,
            },
        
        ]}
    />
);
export default BaseStep;


BaseStep.propTypes = {
    current: PropTypes.number
}
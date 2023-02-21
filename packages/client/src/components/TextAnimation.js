'use client'

import React from 'react'
import { TypeAnimation } from 'react-type-animation'

function TextAnimation() {
  return (
			<TypeAnimation
				// Same String at the start will only be typed once, initially
				sequence={[
					'Trên 500 bản vẽ các loại  ',
					2000,
					'Trên 50 đối tác toàn quốc',
					2000,
					'Trên 400 giao dịch trong tháng',
					2000,
					'Cung cấp mẫu thiết kế mới nhất hiện nay  ',
					2000,
					'Nhà cấp 4',
					2000,
					'Nhà phố ',
					2000,
					'Nhà vườn ',
					2000,
					'...   ',
					2000,
				]}
				speed={10} // Custom Speed from 1-99 - Default Speed: 40
				style={{fontSize: '1.3em'}}
				wrapper='span' // Animation will be rendered as a <span>
				repeat={Infinity} // Repeat this Animation Sequence infinitely
			/>
		);
}

export default TextAnimation
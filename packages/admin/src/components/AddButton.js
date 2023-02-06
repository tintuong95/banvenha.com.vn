import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export default function AddButton({ to }) {
  return (

    <div className='border border-dashed rounded-md p-8 bg-white text-center w-100'>
      <Link to={to||"#"}>
        <span role={"button"} className=''>
          Thêm mới
        </span>
      </Link>
    </div>


  )
}


AddButton.propTypes = {
  to: PropTypes.string
}
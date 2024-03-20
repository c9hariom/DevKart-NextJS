import React from 'react';

export default function InfLoading(props) {
  return (
    <div className='left-0  flex justify-center items-center  bg-white'>
      <img
        className='loader'
        src='/loading.gif'
        alt='loader'
        height={props.height ? props.height : ''}
        width={props.width ? props.width : ''}
      />
    </div>
  );
}

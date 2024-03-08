import React from 'react';

export default function Loading(props) {
  return (
    <div className='fixed top-20 left-0 w-full h-full flex justify-center items-center z-50 bg-white'>
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

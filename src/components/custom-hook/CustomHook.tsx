import { useState } from 'react';

const useHook = () => {
  const [paymentState, setPaymentState] = useState('idle');
  console.log('🚀 ~  useHook ~ paymentState', paymentState);
  return { paymentState, setPaymentState };
};

const CustomHook = () => {
  const { paymentState, setPaymentState } = useHook();
  console.log('🚀 CustomHook ~ paymentState', paymentState);

  return (
    <div>
      <button className='btn-primary' onClick={() => setPaymentState('success')}>
        Success
      </button>
      <button className='btn-primary' onClick={() => setPaymentState('fail')}>
        Fail
      </button>
      <div>{paymentState}</div>
    </div>
  );
};

export default CustomHook;

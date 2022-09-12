import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import classnames from 'classnames';
const Hello = () => {
  return (
    <div className='grid h-screen font-sans bg-slate-800 place-items-center'>
      <div className='h-[70vh] w-[360px] border border-gray-600 rounded-lg p-2'>
        {/* <LayoutGroup>
          <Accordion />
          <Accordion />
          <Accordion />
          <Accordion />
        </LayoutGroup> */}

        {/* <Switch /> */}

        <SharedLayoutAnimation />
      </div>
    </div>
  );
};

export default Hello;

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      layout
      style={{ height: isOpen ? '100px' : '30px' }}
      className='w-full mb-2 bg-gray-500 rounded-md'
    ></motion.button>
  );
};

const Switch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <motion.button
      className={`flex w-24 h-12 p-2 m-4 bg-gray-700 bg-opacity-50 rounded-full drop-shadow ${
        isEnabled ? 'justify-start' : 'justify-end'
      }`}
      onClick={toggleSwitch}
    >
      <motion.div className='w-8 bg-gray-300 rounded-full aspect-square' layout />
    </motion.button>
  );
};

// create array of 20 items of call data,where the call type is either missed or received
const getCalls = () =>
  Array.from({ length: 6 }, (_, i) => ({
    id: i,
    callerName: `Call ${i}`,
    type: i % 2 === 0 ? 'missed' : 'received',
  }));

const SharedLayoutAnimation = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Missed'>('All');
  const [calls, setCalls] = useState(getCalls());

  const filterMissedCalls = () => {
    setCalls(calls.filter((call) => call.type === 'missed'));
  };

  return (
    <div className='flex flex-col items-center justify-start h-full space-y-2 text-white'>
      <h1> Layout Animation</h1>
      {/* HEADER_SECTION */}
      <div className='flex justify-center overflow-hidden rounded-md bg-slate-700'>
        <button
          className={classnames('w-20 h-8 text-sm relative')}
          // className={classnames('w-20 h-8 text-sm rounded-md', {
          //   'bg-gray-300': activeTab === 'All',
          // })}
          onClick={() => {
            setActiveTab('All');
            setCalls(getCalls());
          }}
        >
          {activeTab === 'All' && (
            <motion.div layoutId='active' className='absolute inset-0 rounded-md bg-slate-400' />
          )}
          <span className='relative'>All</span>
        </button>

        <button
          className={classnames('w-20 h-8 text-sm relative')}
          // className={classnames('w-20 h-8 text-sm rounded-md ', {
          //   'bg-gray-300': activeTab === 'Missed',
          // })}
          onClick={() => {
            setActiveTab('Missed');
            filterMissedCalls();
          }}
        >
          {activeTab === 'Missed' && (
            <motion.div layoutId='active' className='absolute inset-0 rounded-md bg-slate-400' />
          )}
          <span className='relative'>Missed</span>
        </button>
      </div>

      {/* BODY_SECTION */}
      <div className='flex flex-col items-center justify-center w-full divide-y divide-gray-500'>
        {/* <AnimatePresence mode='popLayout'> */}
        <LayoutGroup>
          <AnimatePresence>
            {calls.map((call) => (
              <CallItem call={call} key={call.id} />
            ))}
          </AnimatePresence>
        </LayoutGroup>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
};

// https://blog.maximeheckel.com/posts/framer-motion-layout-animations/

const CallItem = ({ call }) => {
  console.log('call re-render', call.id);
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      // style={{ height: isOpen ? '100px' : 'auto' }}
      //   onClick={() => setIsOpen(!isOpen)}
      layout
      key={call.id}
      className={classnames('w-full bg-slate-800 py-3 px-4 flex items-center justify-between ', {
        'text-red-500': call.type === 'missed',
        'text-white': call.type === 'received',
      })}
      // TODO : check if I need the layout animation
      transition={{
        layout: {
          duration: 0.3,

          type: 'spring',
          stiffness: 200,
          damping: 10,
          bounce: 0.01,
        },
        exit: {
          // WRAP WITH ANIMATE PRESENCE
          opacity: 0,

          duration: 0.3,
        },
      }}
      initial={{
        y: -50,
      }}
      animate={{
        y: 0,
        transition: {
          duration: 0.3,
        },
      }}

      // layoutId='call'
      // animate={{ opacity: 1, transition: { duration: 0.3 } }}
      //  exit={{ opacity: 0, transition: { duration: 5 } }}
      // transition={{
      //   opacity: { duration: 0.5 },
      //   layout: {
      //     //   type: 'spring',
      //     // damping: 20,
      //     // stiffness: 300,
      //     //   duration: call.id * 0.25,
      //   },
      // }}
    >
      <span>{call.callerName}</span>
    </motion.div>
  );
};

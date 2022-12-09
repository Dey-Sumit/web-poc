/**
 
 * Wrapper wraps all the components in the carousel 
 *  Container : 100% width or fixed width : overflow hidden
 *   Viewport
 *      The Carousel Card Container (translateX or translate3d)
 *       all the cards as children in display flex (flex-direction: row) for horizontal carousel
 *   Indicators (Dots)
 *   Controls
 */

//  https://dominicarrojado.com/posts/how-to-create-your-own-swiper-in-react-and-typescript-with-tests-part-1/

import { useRef, useState } from 'react';
import { useStateRef } from './hooks';

const Carousel = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0); // this will be used to determine how much the list should be translated in the x axis

  const currentOffsetXRef = useRef(0);

  const startXRef = useRef(0); // stores the starting x position of the touch event

  // const [isMouseDragEnabled, setIsMouseDragEnabled] = useState(false);
  const isMouseDragEnabled = useRef(false);

  const NO_OF_CARDS = 5;
  const CARD_WIDTH = 320;

  // DRAG SCENARIO : START -> onMouseDown -> onMouseMove -> onMouseUp -> END

  // store the touch position , reason ?
  const onMouseDown = (e: React.MouseEvent) => {
    console.log('onMouseDown fired');
    e.preventDefault();

    // setIsMouseDragEnabled(true);
    isMouseDragEnabled.current = true;
    currentOffsetXRef.current = offsetXRef.current as number;
    startXRef.current = e.clientX;

    // We attached these two events in the window so that even if the mouse cursor goes out of the list element, it will still continue to fire both the mouse move and mouse up event.
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
  };

  const onMouseMove = (e: MouseEvent) => {
    console.log('onMouseMove fired');

    e.preventDefault();
    if (!isMouseDragEnabled) return;

    const diff = e.clientX - startXRef.current; // difference between  the current position and the starting position

    const offsetToBeSet = currentOffsetXRef.current + diff * 1.5; // multiply the diff by 1.3 to make the movement faster and then add it to the current offset
    console.log({ offsetToBeSet });

    /* if the the swipe is extends the left or right boundary of the list, then we don't want to move the list

    offsetToBeSet < -(CARD_WIDTH * (NO_OF_CARDS - 1)) : this means that the list is swiped to the left most position , if you try to swipe further, translateX will keep on decreasing and which will make the list go out of the viewport
    why  (NO_OF_CARDS - 1) ?
    the reason is when we swiped the list the list to the last card, then the the last card's right end is at
    
    

    if there are two cards and the width of each card is 320px, then the left most position will be -320px and the right most position will be 0px

    offsetToBeSet > 0 : this means that the list is swiped to the right most position, if you try to swipe further, translateX will keep on increasing and which will make the list go out of the viewport

    */
    // const onMouseMove = (e: MouseEvent) => {
    //   console.log('onMouseMove fired');

    //   e.preventDefault();
    //   if (!isMouseDragEnabled) return;

    //   const diff = e.clientX - startXRef.current; // difference between  the current position and the starting position

    //   const offsetToBeSet = currentOffsetXRef.current + diff * 1.5; // multiply the diff by 1.3 to make the movement faster and then add it to the current offset
    //   console.log({ offsetToBeSet });

    //   /* if the the swipe is extends the left or right boundary of the list, then we don't want to move the list

    //   offsetToBeSet < -(CARD_WIDTH * (NO_OF_CARDS - 1)) : this means that the list is swiped to the left most position , if you try to swipe further, translateX will keep on decreasing and which will make the list go out of the viewport
    //   why  (NO_OF_CARDS - 1) ?
    //   the reason is when we swiped the list the list to the last card, then the the last card's right end is at the right most position of the viewport, so we are calculating the left most position of the last card by multiplying the width of each card with the number of cards - 1,

    //   if there are two cards and the width of each card is 320px, then the left most position will be -320px and the right most position will be 0px
    //   offsetToBeSet > 0 : this means that the list is swiped to the right most position, if you try to swipe further, translateX will keep on increasing and which will make the list go out of the viewport

    //   */

    //   if (offsetToBeSet < -(CARD_WIDTH * (NO_OF_CARDS - 1)) || offsetToBeSet > 0) {
    //     return;
    //   }

    //   setOffsetX(offsetToBeSet);

    //   // We attached these two events in the window so that even if the mouse cursor goes out of the list element, it will still continue to fire both the mouse move and mouse up event.
    //   window.addEventListener('mouseup', onMouseUp);
    //   window.addEventListener('mousemove', onMouseMove);
    // };

    if (offsetToBeSet < -(CARD_WIDTH * (NO_OF_CARDS - 1)) || offsetToBeSet > 0) {
      return;
    }

    setOffsetX(offsetToBeSet);
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    console.log('onMouseUp fired');
    // setIsMouseDragEnabled(false);
    isMouseDragEnabled.current = false;
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  };

  1;
  return (
    //  Container
    <div className='w-[320px] h-[200px]   overflow-hidden relative'>
      {/* Viewport */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className='flex '
        style={{
          // transform: `translateX(-${selectedIndex * 320}px)`,
          transform: `translate3d(${offsetX}px, 0, 0)`,
          transition: 'transform 0.5s ease-in-out',
        }}
        // onTouchStart={handleTouchStart}
        onMouseDown={onMouseDown}
        // onMouseMove={onMouseMove}
        // onMouseUp={onMouseUp}
      >
        {/* Carousel Card Container */}
        {
          // all the cards as children in display flex (flex-direction: row) for horizontal carousel
          new Array(NO_OF_CARDS).fill(0).map((_, index) => (
            <div key={index} className='w-[320px] h-[200px]  flex-grow-0 flex-shrink-0 basis-full'>
              <div className='grid w-full h-full text-2xl bg-blue-700 border-2 border-yellow-300 pointer-events-none place-items-center'>
                <span className='pointer-events-none'>{index}</span>
              </div>
            </div>
          ))
        }
      </div>

      {/* Controllers */}
      <div className='absolute flex justify-between w-full -translate-y-1/2 top-1/2'>
        <button
          disabled={currentCardIndex === 0}
          className='p-2 text-white bg-red-500 '
          onClick={() => {
            setCurrentCardIndex((index) => {
              console.log({
                index: index - 1,
                translateX: -(index - 1) * CARD_WIDTH,
              });

              setOffsetX(-(index - 1) * CARD_WIDTH); // translate the X value to positive CARD_WIDTH*PREVIOUS_CARD_INDEX ,which will move the card to the left
              return index - 1;
            });
          }}
        >
          Prev
        </button>
        <button
          disabled={currentCardIndex === 4}
          className='p-2 text-white bg-red-500 '
          onClick={() => {
            setCurrentCardIndex((index) => {
              console.log({
                index: index + 1,
                translateX: -(index + 1) * CARD_WIDTH,
              });

              setOffsetX(-(index + 1) * CARD_WIDTH); // translate the X value to negative CARD_WIDTH*NEXT_CARD_INDEX ,which will move the card to the left
              return index + 1;
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

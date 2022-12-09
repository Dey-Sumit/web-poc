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
import { getRefValue, useStateRef } from './hooks';

const Carousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0); // stores the starting x position of the touch event
  const [mouseDragged, setIsMouseDragged] = useState(false);

  const NO_OF_CARDS = 5;
  const CARD_WIDTH = 320;

  // console.log({ touchPosition });

  // add mouse move event listener
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (touchPosition === null) {
      return;
    }
  };

  // const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  //   const touchDown = e.touches[0].clientX;
  //   console.log('touchDown', touchDown);

  //   setTouchPosition(touchDown);
  // };

  // add mouse down event listener
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTouchPosition(e.clientX);
    // startX = e.pageX - slider.offsetLeft;
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }
    //    console.log('touchMove', e);

    const currentTouch = e.clientX;
    const diff = touchDown - currentTouch;
    console.log('diff', diff);

    if (diff > 5) {
      setSelectedIndex(selectedIndex + 1);
    }

    // if (diff < -5) {
    //   prev();
    // }

    // setTouchPosition(null);
  };

  // DRAG SCENARIO : START -> onMouseDown -> onMouseMove -> onMouseUp -> END

  // store the touch position , reason ?
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('onMouseDown fired', {
      clientX: e.clientX,
      screenX: e.screenX,
    });
    e.preventDefault();

    setIsMouseDragged(true);

    currentOffsetXRef.current = offsetXRef.current as number;
    startXRef.current = e.clientX;

    // We attached these two events in the window so that even if the mouse cursor goes out of the list element, it will still continue to fire both the mouse move and mouse up event.
    // window.addEventListener('mousemove', onMouseMove);
    // window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!mouseDragged) return;
    console.log({
      clientX: e.clientX,
      screenX: e.screenX,
    });
    const diff = e.clientX - startXRef.current; // difference between the starting position and the current position

    console.log({
      offset: currentOffsetXRef.current + diff * 1.5,
    });
    if (
      currentOffsetXRef.current + diff * 1.5 < -(CARD_WIDTH * (NO_OF_CARDS - 1)) ||
      currentOffsetXRef.current + diff * 1.5 > 0
    ) {
      console.log('return');

      return;
    }
    setOffsetX(currentOffsetXRef.current + diff * 1.5);

    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('onMouseUp fired');
    setIsMouseDragged(false);

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
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* Carousel Card Container */}
        {
          // all the cards as children in display flex (flex-direction: row) for horizontal carousel
          new Array(NO_OF_CARDS).fill(0).map((_, index) => (
            <div key={index} className='w-[320px] h-[200px]  flex-grow-0 flex-shrink-0 basis-full'>
              <div className='grid w-full h-full text-2xl bg-blue-500 border-4 border-blue-900 pointer-events-none place-items-center'>
                <span className='pointer-events-none'>{index}</span>
              </div>
            </div>
          ))
        }
      </div>

      {/* Controllers */}
      <div className='absolute flex justify-between w-full -translate-y-1/2 top-1/2'>
        <button
          disabled={selectedIndex === 0}
          className='p-2 text-white bg-red-500 '
          onClick={() => {
            setSelectedIndex((index) => {
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
          disabled={selectedIndex === 4}
          className='p-2 text-white bg-red-500 '
          onClick={() => {
            setSelectedIndex((index) => {
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

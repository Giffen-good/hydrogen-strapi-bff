import {useProduct, MediaFile} from '@shopify/hydrogen/client';
import Slider from 'react-slick';
import React, {useState} from 'react';
import Arrow from './icons/Arrow';
/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export default function Gallery() {
  const {media, selectedVariant} = useProduct();
  const featuredMedia = selectedVariant.image || media[0].image;
  const featuredMediaSrc = featuredMedia.url.split('?')[0];

  console.log(featuredMediaSrc);
  // const galleryMedia = media.filter((med) => {
  //   if (
  //     med.mediaContentType === MODEL_3D_TYPE ||
  //     med.mediaContentType === VIDEO_TYPE
  //   ) {
  //     return true;
  //   }
  //
  //   return !med.image.url;
  // });
  if (!media.length) {
    return null;
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      // do your stuff here for left swipe
      ShiftSlideOne();
    }

    if (touchStart - touchEnd < -150) {
      // do your stuff here for right swipe
      ShiftSlideOne(false);
    }
  }
  const ShiftSlideOne = (isNext = true) => {
    if (isNext) {
      if (currentSlide === media.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide((currentSlide) => currentSlide + 1);
      }
    } else {
      if (currentSlide === 0) {
        setCurrentSlide(media.length - 1);
      }
      {
        setCurrentSlide((currentSlide) => currentSlide - 1);
      }
    }
  };
  return (
    <div
      className={
        'carousel gap-4 md:sticky  top-0 w-full  md:h-screen  overflow-x-scroll no-scrollbar scroll-snap-x scroll-smooth  md:h-auto place-content-start'
      } // default ''
      onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
      onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => handleTouchEnd()}
      onMouseDown={(mouseDownEvent) => handleTouchStart(mouseDownEvent)}
      onMouseMove={(mouseMoveEvent) => handleTouchMove(mouseMoveEvent)}
      onMouseUp={() => handleTouchEnd()}
      onMouseLeave={() => handleTouchEnd()}
    >
      {/*<SelectedVariantImage className="w-full  object-contain carousel-cell h-screen md:h-auto md:object-cover object-center flex-shrink-0 md:flex-shrink-none snap-start md:col-span-2" />*/}
      {media.map((med, idx) => {
        let extraProps = {};

        if (med.mediaContentType === MODEL_3D_TYPE) {
          extraProps = MODEL_3D_PROPS;
        }

        return (
          <MediaFile
            tabIndex={idx}
            key={med.image.url.split('?')[0]}
            className={`w-full absolute opacity-0  md:h-screen object-cover object-center transition-all snap-start border border-gray-200 flex-shrink-0 rounded-lg
            ${idx == currentSlide ? 'opacity-100' : ''}`}
            media={med}
            options={{
              height: '485',
              crop: 'center',
            }}
            {...extraProps}
          />
        );
      })}
      <span
        className={'cursor-pointer absolute z-10 bottom-2 left-5 prev-arrow'}
        onClick={() => ShiftSlideOne(false)}
      >
        <Arrow />
      </span>
      <span
        onClick={() => ShiftSlideOne()}
        className={'cursor-pointer absolute z-10 bottom-2 right-5 next-arrow'}
      >
        <Arrow />
      </span>
    </div>
  );
}

const MODEL_3D_TYPE = 'MODEL_3D';
const MODEL_3D_PROPS = {
  interactionPromptThreshold: '0',
};
const VIDEO_TYPE = 'VIDEO';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  useTransform: false,
  fade: true,
  slidesToScroll: 1,
};

// class SwipeItem extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       left: 0,
//       originalOffset: 0,
//       velocity: 0,
//       timeOfLastDragEvent: 0,
//       touchStartX: 0,
//       prevTouchX: 0,
//       beingTouched: false,
//       height: 0,
//       intervalId: null,
//     };
//   }
//
//   componentDidMount() {
//     window.setTimeout(() => this.setState({height: 65}), 50);
//   }
//
//   animateSlidingToZero() {
//     let {left, velocity, beingTouched} = this.state;
//     if (!beingTouched && left < -0.01) {
//       velocity += 10 * 0.033;
//       left += velocity;
//       if (left < -350) {
//         window.clearInterval(this.state.intervalId);
//         this.handleRemoveSelf();
//       }
//       this.setState({left, velocity});
//     } else if (!beingTouched) {
//       left = 0;
//       velocity = 0;
//       window.clearInterval(this.state.intervalId);
//       this.setState({left, velocity, intervalId: null, originalOffset: 0});
//     }
//   }
//
//   handleRemoveSelf() {
//     this.setState({height: 0});
//     window.setTimeout(() => this.props.onRemoval(), 250);
//   }
//
//   handleStart(clientX) {
//     if (this.state.intervalId !== null) {
//       window.clearInterval(this.state.intervalId);
//     }
//     this.setState({
//       originalOffset: this.state.left,
//       velocity: 0,
//       timeOfLastDragEvent: Date.now(),
//       touchStartX: clientX,
//       beingTouched: true,
//       intervalId: null,
//     });
//   }
//
//   handleMove(clientX) {
//     if (this.state.beingTouched) {
//       const touchX = clientX;
//       const currTime = Date.now();
//       const elapsed = currTime - this.state.timeOfLastDragEvent;
//       const velocity = (20 * (touchX - this.state.prevTouchX)) / elapsed;
//       let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
//       if (deltaX < -350) {
//         this.handleRemoveSelf();
//       } else if (deltaX > 0) {
//         deltaX = 0;
//       }
//       this.setState({
//         left: deltaX,
//         velocity,
//         timeOfLastDragEvent: currTime,
//         prevTouchX: touchX,
//       });
//     }
//   }
//
//   handleEnd() {
//     this.setState({
//       velocity: this.state.velocity,
//       touchStartX: 0,
//       beingTouched: false,
//       intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 33),
//     });
//   }
//
//   handleTouchStart(touchStartEvent) {
//     touchStartEvent.preventDefault();
//     this.handleMotionStart(touchStartEvent.targetTouches[0].clientX);
//   }
//
//   handleTouchMove(touchMoveEvent) {
//     this.handleMove(touchMoveEvent.targetTouches[0].clientX);
//   }
//
//   handleTouchEnd() {
//     this.handleEnd();
//   }
//
//   handleMouseDown(mouseDownEvent) {
//     mouseDownEvent.preventDefault();
//     this.handleStart(mouseDownEvent.clientX);
//   }
//
//   handleMouseMove(mouseMoveEvent) {
//     this.handleMove(mouseMoveEvent.clientX);
//   }
//
//   handleMouseUp() {
//     this.handleEnd();
//   }
//
//   handleMouseLeave() {
//     this.handleMouseUp();
//   }
//
//   render() {
//     return (
//         <div
//             className="swipeItem"
//             style={{
//               height: this.state.height + 'px',
//               transition: 'height 250ms ease-in-out',
//             }}
//             onTouchStart={(touchStartEvent) =>
//                 this.handleTouchStart(touchStartEvent)
//             }
//             onTouchMove={(touchMoveEvent) => this.handleTouchMove(touchMoveEvent)}
//             onTouchEnd={() => this.handleTouchEnd()}
//             // The following event handlers are for mouse compatibility:
//             onMouseDown={(mouseDownEvent) => this.handleMouseDown(mouseDownEvent)}
//             onMouseMove={(mouseMoveEvent) => this.handleMouseMove(mouseMoveEvent)}
//             onMouseUp={() => this.handleMouseUp()}
//             onMouseLeave={() => this.handleMouseLeave()}
//         >
//           {this.props.children}
//         </div>
//     );
//   }
// }
//
// class SwipeList extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       counter: 1,
//       items: {
//         [0]: 'http://lorempixel.com/350/65/',
//       },
//     };
//   }
//
//   addImage() {
//     this.setState({
//       counter: this.state.counter + 1,
//       items: {
//         ...this.state.items,
//         [this.state.counter]: 'http://lorempixel.com/350/65/',
//       },
//     });
//   }
//
//   removeItem(keyOfItemToRemove) {
//     let nextItems = {};
//     Object.keys(this.state.items).forEach((itemKey) => {
//       if (itemKey !== keyOfItemToRemove) {
//         nextItems[itemKey] = this.state.items[itemKey];
//       }
//     });
//
//     this.setState({items: nextItems});
//   }
//
//   render() {
//     return (
//         <ul className="swipeList">
//           {Object.keys(this.state.items).map((itemKey) => (
//               <SwipeItem
//                   key={`swipeItem-${itemKey}`}
//                   onRemoval={() => this.removeItem(itemKey)}
//               >
//                 <img src={this.state.items[itemKey]} />
//               </SwipeItem>
//           ))}
//           <button className="swipeList-addButton" onClick={() => this.addImage()}>
//             Add image...
//           </button>
//         </ul>
//     );
//   }
// }

import {useInView} from 'react-intersection-observer';
import React, {forwardRef} from 'react';

export default function TransitionElement({children, settings, classes}) {
  const {transition, threshold, trigger_once, duration} = settings;
  const [ref, inView] = useInView({
    threshold: Math.max(0, Math.min(threshold, 100)) / 100,
    triggerOnce: trigger_once,
  });

  return (
    <InsersectionWrapper
      ref={ref}
      inView={inView}
      settings={settings}
      classes={classes}
    >
      {children}
    </InsersectionWrapper>
  );
}
const InsersectionWrapper = forwardRef(
  ({inView, children, settings, classes}, ref) => {
    const {styles} = getTransitionClasses(settings, inView);
    return (
      <div
        ref={ref}
        className={`intersection-observer-wrapper ${classes}
  ${getTransitionClasses(settings, inView).classes}`}
        style={styles ? styles : ''}
      >
        {children}
      </div>
    );
  },
);
function getTransitionClasses(settings, inView) {
  switch (settings.transition) {
    case 'fade_in':
      return fadeIn(settings, inView);
  }
  return {classes: '', styles: ''};
}
function fadeIn(settings, inView) {
  return {
    classes: `faded_out ${inView ? settings.transition : ''}`,
    styles: {transition: `opacity ${settings.duration}s`},
  };
}

import {Suspense} from 'react';

export default function Footer({backgroundColor, children, textColor}) {
  let styles = {
    backgroundColor: backgroundColor ? backgroundColor : 'inherit',
    color: textColor ? textColor : 'inherit'
  }
  return (
    <Suspense fallback={null}>
      <footer
        style={styles}
        className={`pb-12 `}
        role="contentinfo"
      >
        {children}
        <style dangerouslySetInnerHTML={{__html: `
      .sm-icon svg { fill: ${textColor} !important }
      .sm-icon path { fill: ${textColor} !important }
      .mailchimp-form > div > input { border-color:  ${textColor} } 
    `}} />
      </footer>
    </Suspense>
  );
}
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}

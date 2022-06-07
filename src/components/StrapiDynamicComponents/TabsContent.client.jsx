import {useState} from 'react';
import {EventConstants, Emitter} from '../StrapiHelpers/util';

export default function TabsContent({tabIndex, children}) {
  const {CHANGE_ACTIVE_TAB} = EventConstants;
  const [isActive, setIsActive] = useState(0);
  Emitter.on(CHANGE_ACTIVE_TAB, (tabNumber) => setIsActive(tabNumber));
  return (
    <div
      className={`tab-item-content ${
        tabIndex === isActive ? 'active-tab' : ''
      }`}
    >
      {children}
    </div>
  );
}

import {useEffect, useState} from 'react';
import {EventConstants, Emitter} from '../StrapiHelpers/util';
export default function TabsClient({children}) {
  const {OPEN_TAB, CHANGE_ACTIVE_TAB} = EventConstants;
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    Emitter.on(OPEN_TAB, (tabNumber) => setActiveTab(tabNumber));
  }, []);
  useEffect(() => {
    Emitter.emit(CHANGE_ACTIVE_TAB, activeTab);
  }, [activeTab]);

  return <section className={'tabs'}>{children}</section>;
}

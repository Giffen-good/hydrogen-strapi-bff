import {useState, useEffect} from 'react';
export default function TabsLabel({children}) {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {}, []);
  return <h2 className={'tabs-label'}>{children}</h2>;
}

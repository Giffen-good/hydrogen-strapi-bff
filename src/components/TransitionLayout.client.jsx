import { useState, memo, useEffect } from "react";
import styles from './Layout.module.css';
import { useUrl } from "@shopify/hydrogen";

export default function TransitionLayout({ children, classes }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeOut');
  useEffect(() => {
    setTransitionStage('fadeIn');
    setDisplayChildren(children)
  }, []);
  const [init, setInit] = useState(true)
  useEffect(() => {
    if (children !== displayChildren) {
      setDisplayChildren(children)
      setTransitionStage("fadeIn");
    }
  }, [children, setDisplayChildren, displayChildren]);
  let location = useUrl();
  const [path, setPath] = useState(location.pathname)
  useEffect(() => {
    if (location.pathname !== path) {
      setTransitionStage('fadeOut');
      setPath(location.pathname)
    }

  }, [location]);
  return (
    <div className={`${styles.content} ${styles[transitionStage]} ${classes}`}>{displayChildren}</div>
  );
}

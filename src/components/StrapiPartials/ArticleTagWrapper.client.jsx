import {useEffect, useState} from 'react';

function ArticleTagWrapper({children}) {
    const [lastElBackgroundColor, setLastElBackgroundColor] = useState({backgroundColor:'inherit'})
    useEffect(() => {
      const lastEl = document.querySelector('.main-article-content > div:last-child').style.backgroundColor;
      
      setLastElBackgroundColor({backgroundColor:lastEl})

    }, [])
    return (
        <div style={lastElBackgroundColor} className={'article-tags pt-40'}>
            {children}
        </div>
    )
}
export default ArticleTagWrapper;
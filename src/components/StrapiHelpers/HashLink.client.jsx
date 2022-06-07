import { NavHashLink } from 'react-router-hash-link';
export default function HashLink ({url, classes, children}) {
    console.log(url)
    return (
        <NavHashLink to={url} className={classes}>{children}</NavHashLink>
    )
}
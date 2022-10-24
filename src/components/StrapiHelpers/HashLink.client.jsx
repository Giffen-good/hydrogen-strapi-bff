import { NavHashLink } from 'react-router-hash-link';
export default function HashLink ({url, classes, children}) {
    return (
        <NavHashLink to={url} className={classes}>{children}</NavHashLink>
    )
}
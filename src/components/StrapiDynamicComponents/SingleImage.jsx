import StrapiMedia from '../StrapiMedia';
import {sanityCheckToAttributes} from '../StrapiHelpers/util';

export default function SingleImage({single_image, is_full_width, is_flush}) {
    if (!sanityCheckToAttributes(single_image)) return
    return <section className={`${is_flush ? 'flush': ''} ${is_full_width ? 'is_full_width' : 'gutter'}`}><StrapiMedia media={single_image.data.attributes}  /></section>
}
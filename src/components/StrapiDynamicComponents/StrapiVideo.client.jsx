import { AdvancedVideo } from '@cloudinary/react';
import {cld} from '../StrapiHelpers/util';

export default function StrapiVideo({media, classes, wrapperClasses}) {
    let vid = cld.video(media.provider_metadata.public_id);
    let Vid;
    if (media.caption === 'autoplay') {
        return (<div className={`${classes} video-wrapper mx-auto`}><AdvancedVideo cldVid={vid} autoPlay muted loop  /></div>)
    } else {
        return (<div className={`${classes} video-wrapper mx-auto`}><AdvancedVideo cldVid={vid} controls /></div>)
    }
}
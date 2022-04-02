import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import {cld} from '../StrapiHelpers/util';
import {thumbnail, scale} from "@cloudinary/url-gen/actions/resize";


// Import required qualifiers.
import {image} from "@cloudinary/url-gen/qualifiers/source";
export default function StrapiImage({classes, media, thumbnail}) {
      // Use the image with public ID, 'front_face'.
  const myImage = cld.image(media.provider_metadata.public_id);
  // Apply the transformation.
  if (thumbnail) myImage.resize(scale().height(150));
        return (<div className={` mx-auto`}><AdvancedImage cldImg={myImage} className={classes} /></div>)
    }
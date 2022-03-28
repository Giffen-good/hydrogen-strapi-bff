import React from 'react'

import StrapiClientVideo from './StrapiDynamicComponents/StrapiVideo.client'
import {cld} from './StrapiHelpers/util';
import {image} from "@cloudinary/url-gen/qualifiers/source";
import {Cloudinary} from "@cloudinary/url-gen";

export default function StrapiMedia({media, classes}) {
  if (!media) return;
  const customCaption = media.name !== media.caption ? media.caption : '';
  const mimeType = media.mime.split('/')[0];
  const el =
    mimeType === 'video' ? (
      <StrapiClientVideo media={media} />
    ) : (
      <StrapiImage
        image={media}
        classes={classes}
        customCaption={customCaption}
      />
    );
  return el;
}
function SrcsetTags({f}) {
  if (!f) return;
  return (
    <>
      {Object.keys(f).map((imgFormat, i) => {
        return (
          <source
            key={i}
            srcSet={f[imgFormat].url}
            media={`(max-width: ${f[imgFormat].width}px)`}
          />
        );
      })}
    </>
  );
}

function StrapiImage({image, customCaption, classes}) {
  let srcset = '';
  let url = image.url;
  // if (image.provider === 'cloudinary') url = getCloudinaryUrl(image);
  if (image.formats) srcset = <SrcsetTags f={image.formats} />;
  return (
    <picture>
      {srcset}
      <img
        src={image.url}
        alt={image.alternativeText}
        title={customCaption}
        className={classes}
      />
    </picture>
  );
}

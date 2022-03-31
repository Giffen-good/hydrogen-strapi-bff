import ExtraPadding from '../StrapiDynamicComponents/ExtraPadding';
import HeadlineWDate from '../StrapiDynamicComponents/HeadlineWDate';
import BannerImageWithLink from '../StrapiDynamicComponents/BannerImageWithLink';
import HeadlineCredit from '../StrapiDynamicComponents/HeadlineCredit';
import RichTextBody from '../StrapiDynamicComponents/RichTextBody';
import ImageColumns from '../StrapiDynamicComponents/ImageColumns';
import LineSeparatedCredits from '../StrapiDynamicComponents/LineSeparatedCredits';
import Quote from '../StrapiDynamicComponents/Quote';
import EditorialHeaderImage from '../StrapiDynamicComponents/EditorialHeaderImage';
import FeaturedPost from '../StrapiDynamicComponents/FeaturedPost';
import Heading from '../StrapiDynamicComponents/Heading';
import PostsWidget from '../StrapiDynamicComponents/PostsWidget';
import ImageTextPair from '../StrapiDynamicComponents/ImageTextPair';
import Brands from '../StrapiDynamicComponents/Brands';
import ThreeColumnBanner from '../StrapiDynamicComponents/ThreeColumnBanner';
import Tabs from '../StrapiDynamicComponents/Tabs';
import SingleImage from '../StrapiDynamicComponents/SingleImage';
import CreditsWidget from '../StrapiDynamicComponents/CreditsWidget';
import Button from '../StrapiDynamicComponents/Button';

export const Components = {
  Button,
  ExtraPadding,
  HeadlineWDate,
  BannerImageWithLink,
  HeadlineCredit,
  RichTextBody,
  ImageColumns,
  LineSeparatedCredits,
  Quote,
  EditorialHeaderImage,
  FeaturedPost,
  Heading,
  PostsWidget,
  ImageTextPair,
  Brands,
  ThreeColumnBanner,
  Tabs,
  SingleImage,
  CreditsWidget
};
export const getAttributes = (root) => {
  if (hasIn(root, 'data') && hasIn(root.data, 'attributes'))
    return root.data.attributes;
  return;
};
function hasIn(object, key) {
  return object != null && key in Object(object);
}

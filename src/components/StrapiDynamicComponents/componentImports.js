import ExtraPadding from './ExtraPadding';
import HeadlineWDate from './HeadlineWDate';
import BannerImage from './BannerImage';
import HeadlineCredit from './HeadlineCredit';
import RichTextBody from './RichTextBody';
import ImageColumns from './ImageColumns';
import LineSeparatedCredits from './LineSeparatedCredits';
import Quote from './Quote';
import EditorialHeaderImage from './EditorialHeaderImage';
import FeaturedPost from './FeaturedPost';
import Heading from './Heading';
import PostsWidget from './PostsWidget';
export const Components = {
  ExtraPadding,
  HeadlineWDate,
  BannerImage,
  HeadlineCredit,
  RichTextBody,
  ImageColumns,
  LineSeparatedCredits,
  Quote,
  EditorialHeaderImage,
  FeaturedPost,
  Heading,
  PostsWidget,
};
export const getAttributes = (root) => {
  if (hasIn(root, 'data') && hasIn(root.data, 'attributes'))
    return root.data.attributes;
  return;
};
function hasIn(object, key) {
  return object != null && key in Object(object);
}

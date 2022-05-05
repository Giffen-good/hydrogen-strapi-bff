import StrapiMedia from '../StrapiMedia';
import Arrow from '../icons/Arrow';
import FreeLink from '../StrapiHelpers/FreeLink'
import RichTextBody from './RichTextBody'

function addPostType(pages, conversations, essays, presses, covers) {
  if (pages?.data) [...pages.data].map((p) => {p.post_type = 'pages'});
  if (conversations?.data) [...conversations.data].map((p) => {p.post_type = 'conversations'});
  if (essays?.data) [...essays.data].map((p) => {p.post_type = 'essays'});
  if (presses?.data) [...presses.data].map((p) => {p.post_type = 'presses'});
  if (covers?.data) [...covers.data].map((p) => {p.post_type = 'covers'});
}
export default function PostsWidget({title, designer, pages, conversations, stories, essays, covers, presses, post_style, sort_posts, show_all_posts}) {
  addPostType(pages, conversations, essays, presses, covers) 
  const posts = [...pages.data, ...conversations.data, ...stories.data, ...essays.data, ...presses.data, ...covers.data]
  if ((!posts && sort_posts !== 'manual' && show_all_posts !== 'false') && (sort_posts !== 'manual' && show_all_posts === 'false')) return
  return (
    <section className={'post-widget'}>
      {title ? <h2>{title}</h2> : ''}
      <PostWrapper posts={posts} post_style={post_style} sort_posts={sort_posts} show_all_posts={show_all_posts} />
    </section>
  )
}
function PostWrapper({posts, post_style, sort_posts, show_all_posts}) {
  console.log("POST WRAPPER")
  console.log(sort_posts)
  if (sort_posts == 'manual') {
    if (!posts) return
    if (post_style === 'post_widget_1') {
      return <PostWidgetOne posts={posts} />
    } else {
      return <AltPosts post_style={post_style} posts={posts} />  
    }

  }
}
function getPostUrl(post) {
  if (post.attributes?.external_url && post.attributes.external_url) {
    return post.attributes.external_url;
  } else if (post.post_type === 'pages') {
    return `/${post.attributes.slug}`
  } else {
    return `/${post.post_type}/${post.attributes.slug}`
  }
}
function AltPosts({post_style, posts}) {
  console.log("alt posts")
  return (
    <section className={'grid xl:grid-cols-3 grid-cols-1 gap-14 md:grid-cols-2 gutter pt-0'}>
        {posts.map((post) => {
            return (
              <Wrapper url={getPostUrl(post)} noUrl={post.attributes.no_link}>
                <PostWidget post_style={post_style} post={post} />
              </Wrapper>
            )
        })}
    </section>
  )
}
function Wrapper({noUrl, url, children}) {
  if (noUrl) {
    return <>{children}</>
  } else {
    return (
      <FreeLink url={url} classes={''}>
        {children}
      </FreeLink>
    )
  }
}
function StyledPosts({posts, post_style}) {
  if (post_style === 'post_widget_2') {}
}
function PostWidget({post_style, post}) {
  console.log('post:')
  console.log(post)
  if (post_style === 'post_widget_2') return (<PostWidgetTwo post={post}  />)
  if (post_style === 'post_widget_3') return (<PostWidgetThree post={post} />)
  if (post_style === 'post_widget_4') return (<PostWidgetFour post={post} />)
  if (post_style === 'post_widget_5') return (<PostWidgetFive post={post} />)

  return
}
function PostWidgetTwo({post}) {
  const att = post.attributes
  return (
      <article>
              {att.volume_tag ? <h4 className={'uppercase text-2xl font-serif text-yellow-bff pb-1 '}>{att.volume_tag}</h4> : ""}
              <h2 className={'uppercase text-3xl font-semibold pb-0.5'}>{att.title_drop_text} {att.title}</h2>
              {att.excerpt ?(
              <div className={'line-clamp-5 text-xs'}>
                  <RichTextBody noGutter={true} noPadding={true}>
                      {att.excerpt}
                  </RichTextBody> 
              </div>
                  ) : ''}
              <h3 className={'uppercase pt-2 text-xs font-semibold'}>BY: {att.author}</h3>
      </article>
  )
}
function PostWidgetThree({post}) {
  const att = post.attributes;
  const img = att.thumbnail.data?.attributes;
  return (
      <article>
              <div className={'six-9'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full object-cover'} /> : ''}</div>
              <h2 className={'uppercase text-2xl font-semibold pb-0.5 pt-2'}>{att.title_drop_text} {att.title}</h2>
              <div className={'line-clamp-5 text-xs'}>
                  {att.excerpt ? (
                  <RichTextBody noGutter={true} noPadding={true}>
                      {att.excerpt}
                  </RichTextBody>
                  ) : ''}
              </div>
              <h3 className={'uppercase pt-2 font-semibold text-xs'}>BY: {att.author}</h3>
      </article>
  )
}
function PostWidgetFive({post}) {
  const att = post.attributes;
  const img = att.thumbnail.data?.attributes;
  console.log('PostWidgetFive')
  return (
    <article className={''}>
      {/* <div className={'pb-2'}>{postDate(att.publishedAt)}</div> */}
      <div className={'four-five'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full object-cover'} /> : ''}</div>
      {att.volume_tag ? <h4 className={'uppercase text-3xl font-serif pt-3'}>{att.volume_tag}</h4> : ""}
      { att.title ? <h2 className={' pb-2'}>{att.title_drop_text} {att.title}</h2> : ''}
      <div className={' text-xs uppercase font-semibold'}>
      {att.author ? <h3 className={'uppercase  text-xs font-semibold'}>Documented by {att.author}</h3> : ''}
     </div>
    </article>
  )
}
function PostWidgetFour({post}) {
  const att = post.attributes;
  const img = att.thumbnail.data?.attributes;
    return (
      <article className={'text-center'}>
                {/* <div className={'pb-2'}>{postDate(att.publishedAt)}</div> */}
                <div className={'sixty-five'}>{img ? <StrapiMedia media={img} classes={'absolute top-0 left-0 w-full h-full object-cover'} /> : ''}</div>
                { att.title ? <h2 className={'uppercase text-2xl font-semibold pb-2 pt-4'}>{att.title_drop_text} {att.title}</h2> : ''}
                <div className={' text-xs'}>
                  {att.excerpt ? (
                    <RichTextBody noGutter={true} noPadding={true}>
                        {att.excerpt}
                    </RichTextBody>
                    ) : ''}
                </div>
        </article>
    )
  
}
const PostWidgetOne = ({posts}) => {
  let pageBlocks = [];
  let i = 0;
  let tmp = [];
  posts.forEach((p) => {
    tmp.push(p);
    if (i === 1) {
      pageBlocks.push(tmp);
      tmp = [];
      i = 0;
    } else {
      i++;
    }
  });
  if (tmp.length) pageBlocks.push(tmp);
  return (
      
      <div className={'xl:flex-nowrap flex-wrap xl:max-w-none max-w-4xl flex gap-4 w-full mx-auto px-4 xl:px-10 sm:px-4 md:px-6 lg:px-8 xl:gutter-mw'}>
        {pageBlocks.map((block, k) => {
          return (
            <div
              className={
                'block xl:w-auto w-full gap-4 flex-auto xl:flex-1 grid sm:grid-cols-2 xl:flex  flex-auto xl:flex-nowrap flex-wrap xl:flex-1'
              }
              key={k}
            >
              {block.map((page, idx) => {
                return <PostBlock key={idx} page={page} />;
              })}
            </div>
          );
        })}
      </div>
  );
}
const PostBlock = ({page}) => {
  const att = page.attributes;
  return (
    <FreeLink
      url={getPostUrl(page)}
      classes={
        'block border-t border-black gap-3 md:flex-1 flex flex-col flex-auto justify-between border-b py-2 w-auto'
      }
    >
      <div className={'flex flex-1 '}>
        <div className={''}>
          {att.thumbnail.data ? (
            <StrapiMedia
              thumbnail={true}
              classes={
                'w-[6rem] h-[6.5rem] box-content pr-2 py-1 h-full object-cover'
              }
              media={att.thumbnail.data.attributes}
            />
          ) : (
            <div className={'fallback'}></div>
          )}
        </div>
        <div className={'flex-1 py-1 pl-2 flex flex-col h-full '}>
          <h4 className={'tracking-widest uppercase text-sm font-semibold'}>{att.designer}</h4>
          <h3
            className={
              'text-xl py-1  text-ellipsis line-clamp-2 overflow-hidden ...'
            }
          >
            {att.title}
          </h3>
          <div className={'flex-grow'}></div>
          <div
            className={
              'text-xs pb-[0.3rem] post-widget-title items-center uppercase flex justify-between'
            }
          >
            <h6 className={'text-xxs'}>Read More</h6>
            <Arrow />
          </div>
        </div>
      </div>
    </FreeLink>
  );
};
function postDate(publishedAt) {
  const dateObj = new Date(publishedAt);
  const month = dateObj.getUTCMonth(); //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  return `${day} ${months[month]} ${year}`;
}
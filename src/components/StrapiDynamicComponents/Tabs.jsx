import RichTextBody from './RichTextBody';
import TabsClient from './Tabs.client';
import TabsLabel from './TabsLabel.client';
import TabsContent from './TabsContent.client';
export default function Tabs({tabs}) {
  console.log(tabs);

  return (
    <TabsClient>
      <section
        className={'flex justify-between pt-16 pb-16 narrow-gutter gutter'}
      >
        {tabs.map((t, idx) => {
          return (
            <TabsLabel key={idx}>
              <h2 className={'text-5xl font-serif cursor-pointer'}>
                {t.title}
              </h2>
            </TabsLabel>
          );
        })}
      </section>
      <section className={`tabs-content `}>
        {tabs.map((c, idx) => {
          return (
            <TabsContent key={idx} tabIndex={idx}>
              <RichTextBody text_alignment={'centered'} Width={'narrow'}>
                {c.body}
              </RichTextBody>
            </TabsContent>
          );
        })}
      </section>
    </TabsClient>
  );
}

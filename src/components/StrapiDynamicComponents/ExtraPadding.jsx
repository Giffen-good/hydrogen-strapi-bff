export default function ExtraPadding({
  extra_padding,
  background_color_padding,
}) {
  return (
    <>
      {extra_padding ? (
        <div
          style={{
            paddingTop: `${extra_padding}rem`,
            backgroundColor: background_color_padding,
          }}
        ></div>
      ) : (
        ''
      )}
    </>
  );
}

export default function StrapiBackgroundColor({children, bg_color, font_color, classes}) {
  const bgColor = bg_color ? bg_color : 'inherit'
  const fontColor = font_color ? font_color : 'inherit'
  return (
    <div className={classes} style={{backgroundColor: bgColor, color: fontColor}}>
      {children}
    </div>
  );
}

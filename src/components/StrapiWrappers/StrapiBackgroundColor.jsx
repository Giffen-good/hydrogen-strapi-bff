export default function StrapiBackgroundColor({children, bg_color, font_color, classes}) {
  return (
    <div className={classes} style={{backgroundColor: bg_color, color: font_color}}>
      {children}
    </div>
  );
}

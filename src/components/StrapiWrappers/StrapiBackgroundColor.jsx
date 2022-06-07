export default function StrapiBackgroundColor({children, bg_color, font_color, classes, remove_section_padding}) {
  const bgColor = bg_color ? bg_color : 'inherit'
  const fontColor = font_color ? font_color : 'inherit'

  return (
    <div className={`${classes} ${remove_section_padding ? 'remove_section_padding' : ''}`} style={{backgroundColor: bgColor, color: fontColor}}>
      {children}
    </div>
  );
}

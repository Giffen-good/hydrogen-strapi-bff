export default function StrapiBackgroundColor({children, color, classes}) {
  return (
    <div className={classes} style={{backgroundColor: color}}>
      {children}
    </div>
  );
}

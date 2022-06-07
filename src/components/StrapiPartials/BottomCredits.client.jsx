import LineSeparatedCredits from "../StrapiDynamicComponents/LineSeparatedCredits";

function BottomCreditsClient({credits, copy}) {
   return (
        <div className={'absolute bottom-3 gutter w-full narrow-gutter header-offset inset-x-0 uppercase pb-6 '}>
            {credits.map((line,n) => {
                return <LineSeparatedCredits key={n} credit={line.credit} />
            })}
            <h3 className={'text-sm text-center pt-2'}>{copy}</h3>
        </div>
    )
}
export default BottomCreditsClient;
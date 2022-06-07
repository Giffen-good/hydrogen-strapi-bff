export default function CreditWidget({credit_widget}) {
    return ( 
        <section className={'flex flex-wrap gutter gap-12'}>
           {credit_widget.map((c,k) => {
               return (<div key={k} className={'flex-1 text-center min-w-[200px]'}>
                   <div className={''}>{c.job_title}</div>
                   <div className={'font-semibold uppercase text-xs pt-4'}>{c.name}</div>
               </div>) 
           })} 
        </section> 
    )
}
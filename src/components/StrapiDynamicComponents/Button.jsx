import ButtonEl from '../Button'
export default function Button({link}) {
    const {Label, free_sub_limk} = link
    return (
        <section className={'text-center'}>
            <ButtonEl url={free_sub_limk} label={Label} />
        </section>
    )
}
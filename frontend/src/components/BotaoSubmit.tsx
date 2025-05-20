interface BotaoProps{
    label?: string
}

export default function BotaoSubmit(props: BotaoProps){
    return(
        <button className="bg-black w-full py-4 rounded-2xl">{props.label}</button>
    )
}
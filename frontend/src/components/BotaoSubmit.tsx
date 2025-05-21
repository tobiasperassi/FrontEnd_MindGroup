interface BotaoProps {
  label?: string;
}

export default function BotaoSubmit(props: BotaoProps) {
  return (
    <button
      type="submit"
      className="bg-black w-full py-4 rounded-2xl text-white"
    >
      {props.label}
    </button>
  );
}

type CardProps = {
  title: string,
  text: string,
};

const Card = ({ title, text }: CardProps) => {
  return (
    <div
      className="flex flex-col gap-2 p-2 px-4 rounded-sm bg-white/10 text-slate-200 hover:bg-white/20"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="text-md">{text}</div>
    </div>
  )
};

export default Card;

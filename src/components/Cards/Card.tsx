import { CardProps } from "./interfaces/Card.models";

const CardComponent = ({ header, content, image }: CardProps) => {
  return (
    <>
      <div className="w-2/3 rounded-lg bg-[#131314] p-6 sm:w-full">
        <h3 className="mb-2 text-2xl font-semibold">{header}</h3>
        <div className="text-gray-400">{content}</div>
      </div>
    </>
  );
};

export default CardComponent;

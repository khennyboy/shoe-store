import { BiError } from "react-icons/bi";
const Error = (info) => {
  const { error } = info;
  if (!error) return null;
  return (
    <div className=" py-2 flex items-center gap-1 ">
      <BiError className=" text-orange-500 size-6 align-text-bottom " />
      <span className="inline-block ">{error}</span>
    </div>
  );
};

export default Error;

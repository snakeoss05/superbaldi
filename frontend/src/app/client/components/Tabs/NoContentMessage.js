const NoContentMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-4 p-4 h-64 w-full">
    <p className="text-3xl text-gray-500 font-semibold capitalize">{message}</p>
  </div>
);
export default NoContentMessage;
const TabContent = ({ title, children }) => (
  <div className="flex flex-col items-start justify-start gap-4 p-4">
    <p className="text-3xl text-gray-700 font-semibold capitalize">{title}</p>
    {children}
  </div>
);
export default TabContent;
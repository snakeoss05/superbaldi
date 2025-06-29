const TabButton = ({ label, isActive, onClick, additionalClasses = "" }) => (
  <button
    className={`uppercase text-prim text-sm sm:text-base font-semibold transition duration-300 px-2 sm:px-4 py-2   h-full hover:bg-[#D2EF9A] hover:text-black ${
      isActive && "bg-[#D2EF9A] text-black shadow-lg"
    } ${additionalClasses}`}
    onClick={onClick}>
    {label}
  </button>
);
export default TabButton;

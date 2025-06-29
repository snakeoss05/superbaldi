const AdditionalInfoTable = ({ info }) => (
  <table className="table-auto w-full border border-gray-200 bg-gray-50">
    <tbody>
      {info.map((item, index) => (
        <tr className="border-b" key={index}>
          <td className="text-md text-gray-700 font-bold p-2">{item.key}</td>
          <td className="text-md text-gray-700 font-normal p-2 border-l capitalize">
            {item.value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default AdditionalInfoTable;

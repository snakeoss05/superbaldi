import React from "react";
import TabButton from "./TabButton";
import TabContent from "./TabContent";
import NoContentMessage from "./NoContentMessage";
import AdditionalInfoTable from "./AdditionalInfoTable";

const Tabs = ({ tabs, setTabs, product }) => {
  const { description, additionalInfo = [] } = product;

  return (
    <div className="col-span-2">
      {/* Tab Buttons */}
      <div className="flex flex-row items-center justify-start border h-16 overflow-hidden w-fit border-gray-100 mb-4 bg-gray-50 rounded-xl">
        <TabButton
          label="Description"
          isActive={tabs === 1}
          onClick={() => setTabs(1)}
        />
        <TabButton
          label="Additional information"
          isActive={tabs === 2}
          onClick={() => setTabs(2)}
        />
        <TabButton
          label="Reviews (0)"
          isActive={tabs === 3}
          onClick={() => setTabs(3)}
        />
      </div>

      {/* Tab Content */}
      {tabs === 1 && (
        <TabContent title="Description">
          <p className="text-md text-gray-700 font-normal">{description}</p>
        </TabContent>
      )}

      {tabs === 2 && (
        <TabContent title="Additional information">
          {additionalInfo.length === 0 ? (
            <NoContentMessage message="No information" />
          ) : (
            <AdditionalInfoTable info={additionalInfo} />
          )}
        </TabContent>
      )}

      {tabs === 3 && (
        <TabContent title="Reviews">
          <NoContentMessage message="No reviews" />
        </TabContent>
      )}
    </div>
  );
};

export default Tabs;

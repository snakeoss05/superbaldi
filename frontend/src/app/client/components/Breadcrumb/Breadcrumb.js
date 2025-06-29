"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NextBreadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  showtheLastElement,
}) => {
  const paths = usePathname(); // Get the current path
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <ul className={containerClasses}>
        {/* Home breadcrumb */}
        <li className={listClasses}>
          <Link href={"/"}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}

        {/* Iterate through path segments */}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;
          const itemClasses = isLast
            ? `${listClasses} ${activeClasses}`
            : listClasses;

          // Capitalize link text if needed
          const displayName = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1)
            : link;

          // Check if it's a product page and replace the ID with the product name
          const isProductPage = pathNames[index - 1] === "product";
          let displayedLink = displayName;

          if (isProductPage) {
            // Assuming the name comes from the URL, you can decode the name here
            const decodedProductName = decodeURIComponent(link); // Decode URL-encoded product name
            displayedLink = decodedProductName; // Display product name instead of ID
          }

          // Only render the last item if `showtheLastElement` is true

          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{displayedLink}</Link>
              </li>
              {/* Render separator only if it's not the last item */}
              {isLast ? null : separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;

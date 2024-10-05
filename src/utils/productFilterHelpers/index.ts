export const getSortOptions = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  //key map
  const sortKeyMap: { [key: string]: string } = {
    new: "createdAt",
    asc: "priceInCents",
    desc: "priceInCents",
  };

  const sortField = sortKeyMap[searchParams.sort];
  const sortOrder: "asc" | "desc" =
    searchParams.sort !== "asc" ? "desc" : "asc";
  const options = { sortField, sortOrder }; // Prepare the object with field and order

  return options;
};

export const validateSortParams = (
  sortField: string,
  sortOrder: string,
): { sortField: string; sortOrder: "asc" | "desc" } => {
  const allowedSortFields = ["priceInCents", "name", "createdAt"];
  const allowedSortOrders: ("asc" | "desc")[] = ["asc", "desc"];

  if (!allowedSortFields.includes(sortField)) {
    sortField = "priceInCents";
  }

  if (sortOrder === "new") {
    sortOrder = "desc";
    sortField = "createdAt";
  } else if (!allowedSortOrders.includes(sortOrder as "asc" | "desc")) {
    sortOrder = "desc";
  }

  return { sortField, sortOrder: sortOrder as "asc" | "desc" };
};

export const getSortOptions = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let sortValues = Object.values(searchParams);

  //key map
  const sortKeyMap: { [key: string]: string } = {
    new: "createdAt",
    asc: "priceInCents",
    desc: "priceInCents",
  };

  const sortField = sortKeyMap[sortValues[0] as string];
  const sortOrder: "asc" | "desc" =
    sortValues[0] === "new" || sortValues[0] === "desc" ? "desc" : "asc";
  const options = { sortField, sortOrder }; // Prepare the object with field and order

  return options;
};

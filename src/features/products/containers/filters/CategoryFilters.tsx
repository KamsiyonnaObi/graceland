import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CategoryFilterList from "../../components/filters/CategoryFilterList";
import { getSubcategories } from "@/server/actions/category.actions";

export default async function CategoryFilters({
  categorySlug,
}: {
  categorySlug: string | undefined;
}) {
  const categories = await getSubcategories(categorySlug);

  return (
    categories.length > 0 && (
      <Accordion type="single" collapsible>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-bold">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            {categories.map((cat) => (
              <CategoryFilterList
                key={cat.slug}
                categorySlug={cat.slug}
                categoryName={cat.name}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}

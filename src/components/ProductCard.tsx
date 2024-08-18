import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description?: string;
  imagePath: string;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <Card className="flex cursor-pointer flex-col overflow-hidden rounded-md border-none shadow-none">
        <div className="relative h-[200px]">
          <Image src={imagePath} fill alt={name} className="object-contain" />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-4 text-sm font-normal">
            {name}
          </CardTitle>
          <CardDescription className="text-sm font-bold text-black">
            {formatCurrency(priceInCents / 100)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex animate-pulse flex-col overflow-hidden">
      <div className="aspect-video w-full bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="h-6 w-3/4 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="h-4 w-1/2 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-3/4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}

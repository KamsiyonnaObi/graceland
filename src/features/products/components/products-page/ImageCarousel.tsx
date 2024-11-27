import * as React from "react";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageProps {
  id: number;
  url: string;
}

interface ImageCarouselProps {
  productName: string;
  images: ImageProps[];
}

export function ImageCarousel({ productName, images }: ImageCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1">
              <div className="flex-center relative mx-auto aspect-square rounded-md p-6">
                <Image
                  src={image.url}
                  alt={`${productName}-${image.id}`}
                  className="rounded-md object-contain"
                  fill
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

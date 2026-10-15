"use client";

import { cn } from "cn";
import { GripHorizontal, PlusCircle } from "lucide-react";
import { type ComponentProps } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StocksMiniCard from "./StocksMiniCard";
import { ESource } from "@/enums";

interface Props {
  symbols?: { value: string; source: string }[];
  name?: string;
}

const COLORS = [
  "bg-secondary-yellow-light",
  "bg-secondary-green-light",
  "bg-secondary-blue-light",
  "bg-secondary-purple",
];

const StocksMiniCardList = ({
  name,
  symbols,
  className,
  ...props
}: ComponentProps<"div"> & Props) => {
  if (!symbols) return null;

  return (
    <div
      {...props}
      className={cn(
        "flex min-w-0 w-full max-w-full flex-col gap-2 h-full cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      <div className="flex gap-2">
        <span className="text-regular">{name}</span>
        <PlusCircle className="stroke-primary cursor-pointer" />
        <GripHorizontal className="mr-auto ml-auto stroke-primary" />
      </div>

      <div className="box-border min-w-0 w-full max-w-full flex-1 min-h-0 overflow-hidden rounded-lg bg-white p-3">
        <Swiper
          modules={[FreeMode, Autoplay]}
          direction="horizontal"
          slidesPerView={5}
          spaceBetween={8}
          loop
          speed={6000}
          freeMode={{
            enabled: true,
            momentum: false,
            sticky: false,
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="stocks-swiper h-full min-w-0 w-full ease-linear! *:ease-linear!"
        >
          {symbols.map((item, indx) => {
            return (
              <SwiperSlide key={"stocks-list-item-" + indx + "-" + item.value}>
                <StocksMiniCard
                  className={COLORS[indx % COLORS.length]}
                  symbol={item.value}
                  source={item.source as ESource}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default StocksMiniCardList;

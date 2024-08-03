"use client";

import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { useState } from "react";

import { useMediaQuery } from "@/lib/hook/use-media-query";

import { Large } from "../typography/large";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CodaFrame } from "./frame/coda-frame";

type Item = {
  key: string;
  label: string;
  url: string;
};

interface CodaTabsProps {
  items: Item[];
}

export function CodaTabs({ items }: CodaTabsProps) {
  const defaultItem = items.at(0);

  if (!defaultItem) {
    return null;
  }

  const isMobile = useMediaQuery("(max-width: 767px)");
  const [currentPage, setCurrentPage] = useState<Item>(defaultItem);

  const hasNext = (item: Item) => {
    const i = items.indexOf(item);
    return i >= 0 && i < items.length - 1;
  };

  const hasPrevious = (item: Item) => {
    const i = items.indexOf(item);
    return i > 0;
  };

  const next = () => {
    setCurrentPage((prev) => {
      const i = items.indexOf(prev);

      if (hasNext(prev)) {
        return items[i + 1];
      }

      return prev;
    });
  };

  const previous = () => {
    setCurrentPage((prev) => {
      const i = items.indexOf(prev);

      if (hasPrevious(prev)) {
        return items[i - 1];
      }

      return prev;
    });
  };

  return (
    <Tabs
      className="mt-3"
      value={currentPage.key}
      onValueChange={(key) => {
        const item = items.find(item => item.key === key);
        if (item) setCurrentPage(item);
      }}
    >
      <TabsList className="space-x-4">
        {isMobile ? (
          <div className="flex w-full items-center justify-between">
            <Button
              size={"icon"}
              onClick={previous}
              disabled={!hasPrevious(currentPage)}
            >
              <LucideChevronLeft />
            </Button>
            <Large>{currentPage.label}</Large>
            <Button
              size={"icon"}
              onClick={next}
              disabled={!hasNext(currentPage)}
            >
              <LucideChevronRight />
            </Button>
          </div>
        ) : (
          items.map(({ key, label }) => (
            <TabsTrigger key={key} value={key}>
              <Large>{label}</Large>
            </TabsTrigger>
          ))
        )}
      </TabsList>

      {items.map(({ key, url }) => (
        <TabsContent key={key} value={key}>
          <CodaFrame embedUrl={url} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

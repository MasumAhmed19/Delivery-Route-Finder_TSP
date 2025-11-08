import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn("container mx-auto", className)}>{children}</div>;
};

export default Container;

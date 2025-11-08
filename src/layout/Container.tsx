import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn("max-w-7xl mx-auto", className)}>{children}</div>;
};

export default Container;

import { ViewTransition, type ReactNode } from "react";

/**
 * Soft fade-and-rise between pages (React <ViewTransition>, styled in globals.css).
 * Wraps each page rather than the layout — layouts persist, so enter/exit never fire there.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}

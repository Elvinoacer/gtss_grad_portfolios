"use client";

/**
 * Hash-based client router.
 * The platform ships as a single Next.js route (`/`) while the full
 * information architecture (spec §12) lives in the hash segment —
 * deep-linkable, back-button friendly, multi-university ready.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getLenis } from "@/components/elite/smooth-scroll";

interface RouterCtx {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterCtx>({
  path: "/",
  navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState("/");

  useEffect(() => {
    const read = () => {
      const raw = window.location.hash.replace(/^#/, "");
      const clean = raw.startsWith("/") ? raw : raw ? `/${raw}` : "/";
      return clean;
    };
    const update = () => setPath(read());
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      const clean = to.startsWith("/") ? to : `/${to}`;
      const current = window.location.hash.replace(/^#/, "");
      if (current === clean) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      window.location.hash = clean;
    },
    []
  );

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

/** Internal link that plays nicely with the hash router */
export function Link({
  to,
  children,
  className,
  onClick,
  ariaLabel,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const { navigate } = useRouter();
  const isInternal = to.startsWith("/") || to.startsWith("#");
  if (!isInternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={`#${to}`}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Set per-view document title without hydration concerns */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | GTSS Graduate Portfolios`
      : "GTSS Graduate Portfolios | Moi University Collection";
    return () => {
      document.title = "GTSS Graduate Portfolios | Moi University Collection";
    };
  }, [title]);
}

/** Smooth-scroll to a section inside the current view (Lenis-aware) */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    // Prefer Lenis when the smooth-scroll layer is active
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -96, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

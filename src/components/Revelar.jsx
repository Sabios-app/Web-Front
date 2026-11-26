import { useEffect, useRef, useState } from "react";

export default function Revelar({
  children,
  atraso = 0,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(
    () =>
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (visivel) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observador.observe(ref.current);
    return () => observador.disconnect();
  }, [visivel]);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${atraso}ms` }}
      className={`transition-[opacity,translate] duration-700 ease-suave ${
        visivel ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

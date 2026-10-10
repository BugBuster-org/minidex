// Full class names are spelled out so Tailwind can see them at build time.
const TYPE_COLORS: Record<string, string> = {
  normal: "bg-stone-400 text-white",
  fire: "bg-orange-500 text-white",
  water: "bg-sky-500 text-white",
  electric: "bg-yellow-400 text-yellow-950",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-cyan-950",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-300 text-indigo-950",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-lime-950",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-violet-700 text-white",
  dragon: "bg-indigo-600 text-white",
  dark: "bg-neutral-700 text-white",
  steel: "bg-slate-400 text-slate-950",
  fairy: "bg-rose-300 text-rose-950",
};

const FALLBACK = "bg-muted text-muted-foreground";

export function typeColor(name: string): string {
  return TYPE_COLORS[name.toLowerCase()] ?? FALLBACK;
}

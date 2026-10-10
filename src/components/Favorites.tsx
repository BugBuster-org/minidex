import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Favorite } from "../api/types";
import { formatId } from "../lib/format";
import { spriteUrl } from "../lib/sprites";

interface Props {
  favorites: Favorite[];
  onSelect: (name: string) => void;
  onRemove: (id: number) => void;
}

export function Favorites({ favorites, onSelect, onRemove }: Props) {
  return (
    <aside>
      <Card className="h-fit px-4">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Heart aria-hidden className="size-5 fill-primary text-primary" />
          Favorites
        </h2>
        {favorites.length === 0 ? (
          <p className="text-muted-foreground">No favorites yet.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {favorites.map((f) => (
              <li
                key={f.id}
                className="flex items-center gap-1 rounded-lg hover:bg-accent/60"
              >
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 justify-start capitalize"
                  onClick={() => onSelect(f.name)}
                >
                  <img
                    src={spriteUrl(f.id)}
                    alt=""
                    className="size-8 [image-rendering:pixelated]"
                  />
                  {formatId(f.id)} {f.name}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${f.name} from favorites`}
                  onClick={() => onRemove(f.id)}
                >
                  <X aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </aside>
  );
}

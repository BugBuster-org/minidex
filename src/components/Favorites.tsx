import type { Favorite } from "../api/types";
import { formatId } from "../lib/format";

interface Props {
  favorites: Favorite[];
  onSelect: (name: string) => void;
  onRemove: (id: number) => void;
}

export function Favorites({ favorites, onSelect, onRemove }: Props) {
  return (
    <aside>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((f) => (
            <li key={f.id}>
              <button type="button" onClick={() => onSelect(f.name)}>
                {formatId(f.id)} {f.name}
              </button>
              <button
                type="button"
                aria-label={`Remove ${f.name} from favorites`}
                onClick={() => onRemove(f.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

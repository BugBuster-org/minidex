import { http, HttpResponse } from "msw";
import { API_BASE } from "../api/pokeapi";
import page1 from "../fixtures/list-page-1.json";
import page2 from "../fixtures/list-page-2.json";
import bulbasaur from "../fixtures/bulbasaur.json";
import charizard from "../fixtures/charizard.json";
import pikachu from "../fixtures/pikachu.json";

const details = [bulbasaur, charizard, pikachu];

export const handlers = [
  http.get(`${API_BASE}/pokemon`, ({ request }) => {
    const offset = Number(new URL(request.url).searchParams.get("offset") ?? 0);
    return HttpResponse.json(offset === 0 ? page1 : page2);
  }),
  // Only the three fixture pokemon have detail data; others are 404.
  http.get(`${API_BASE}/pokemon/:nameOrId`, ({ params }) => {
    const key = String(params.nameOrId);
    const found = details.find((p) => p.name === key || String(p.id) === key);
    return found
      ? HttpResponse.json(found)
      : HttpResponse.json({ detail: "Not found" }, { status: 404 });
  }),
];

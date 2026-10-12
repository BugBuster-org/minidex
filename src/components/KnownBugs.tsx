import { Bug } from "lucide-react";
import { Card } from "@/components/ui/card";

// minidex is a test target for a bug-fixing bot. These bugs are planted on
// purpose and listed here so they are visible to anyone using the app.
const BUGS = [
  {
    title: "Weight is 10x too small",
    where: "Detail view, Weight",
    expected: "Pikachu weighs 6 kg",
    actual: "Pikachu weighs 0.6 kg",
  },
  {
    title: "Next page is enabled on the last page",
    where: "List, pagination",
    expected: "Next is disabled on the last page",
    actual: "Next stays enabled and opens an empty page",
  },
  {
    title: "Search ignores uppercase queries",
    where: "List, name search",
    expected: "PIKA finds pikachu",
    actual: "PIKA finds nothing",
  },
  {
    title: "Type filter ignores the second type",
    where: "List, type filter",
    expected: "Flying shows charizard",
    actual: "Flying hides charizard",
  },
  {
    title: "Type filter options are not sorted",
    where: "List, type filter dropdown",
    expected: "Types in alphabetical order",
    actual: "Types in the order they first appear",
  },
];

export function KnownBugs() {
  return (
    <aside>
      <Card className="h-fit px-4">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Bug aria-hidden className="size-5 text-destructive" />
          Known bugs
        </h2>
        <p className="text-sm text-muted-foreground">
          Planted on purpose for bug-fixing tests.
        </p>
        <ol className="flex flex-col gap-3">
          {BUGS.map((b, i) => (
            <li key={b.title} className="rounded-lg border p-3 text-sm">
              <p className="font-semibold">
                {i + 1}. {b.title}
              </p>
              <p className="text-muted-foreground">{b.where}</p>
              <p>
                <span className="font-medium">Expected:</span> {b.expected}
              </p>
              <p className="text-destructive">
                <span className="font-medium">Actual:</span> {b.actual}
              </p>
            </li>
          ))}
        </ol>
      </Card>
    </aside>
  );
}

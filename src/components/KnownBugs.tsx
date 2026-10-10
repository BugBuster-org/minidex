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
    title: "Stat bars are always full",
    where: "Detail view, base stats",
    expected: "Bar length is proportional to the stat",
    actual: "Every bar fills the whole track",
  },
  {
    title: "Ids are padded to two digits",
    where: "List, detail and favorites",
    expected: "#001 bulbasaur",
    actual: "#01 bulbasaur",
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

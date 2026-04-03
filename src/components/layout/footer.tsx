import { Separator } from "@/components/ui/separator";
import { footerColumns } from "@/data/nav";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">🇰🇷 Korea Nomad</span>
            <select className="text-sm text-muted-foreground bg-transparent border rounded px-2 py-1">
              <option>한국어</option>
              <option>English</option>
              <option>日本語</option>
              <option>中文</option>
            </select>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Korea Nomad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

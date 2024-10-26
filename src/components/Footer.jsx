// Components
import { Logo, GithubIcon, UserIcon } from "./icons";
import { Flowbite, DarkThemeToggle } from "flowbite-react";

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between p md:h-14 w-full px-4 py-2 border-b border-violet-300 bg-gradient-to-r from-violet-600 to bg-violet-400 gap-2">
      <span style={{ display: "flex", textDecoration: "none", gap: "5px" }}>
        <Logo svgClassName="fill-black" />
        {"MyLeague (beta)"}
      </span>
      <a
        style={{ display: "flex", textDecoration: "none", gap: "5px" }}
        href={"https://github.com/eloicasamayor/my-league-rtk-query"}
        target="_blank"
      >
        <GithubIcon />
        Source code
      </a>
      <a
        style={{ display: "flex", textDecoration: "none", gap: "5px" }}
        href="https://eloicasamayor.github.io/new-portfolio/"
        target="_blank"
      >
        <UserIcon className={"fill-black	"} />
        About the author
      </a>

      <Flowbite>
        <DarkThemeToggle className="text-black" />
      </Flowbite>
    </footer>
  );
}

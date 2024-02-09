import { Image, Link } from "@nextui-org/react";

export default function Footer() {
    return (<footer className="px-4 py-8 dark:bg-gray-800 dark:text-gray-400">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		<div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
			<div className="flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-full dark:bg-primary text-default">
				<img src="/Logo_BLACK_ONLY2.svg" />
			</div>
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li className="border-r-1 border-default-400 pr-4">
					<span>Stowarzyszenie <br />Polish Leather <br />Uniform Goup</span>
				</li>
				<li>
					<Link href="/privacy">Polityka Prywatności</Link>
				</li>
			</ul>
		</div>
	</div>
</footer>);
}
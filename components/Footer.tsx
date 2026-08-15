export default function Footer() {
    return (
        <footer className="my-12 text-center">
            <div className="mb-4 text-lg">
                <p className="text-gray-500 mb-0">Enjoying Bloomoji?</p>
                <a href="https://buymeacoffee.com/jovihanni" target="_blank" rel="noopener noreferrer">Buy me a coffee ☕</a>
            </div>
            <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Bloomoji. All rights reserved.</div>
            <div className="text-sm text-gray-500">Source code can be found on <a href="https://github.com/JovihanniCasenas/bloomoji" target="_blank" rel="noopener noreferrer" className="text-blue-900">GitHub</a>.</div>
            <div className="text-sm text-gray-500">Created by <a href="https://portfolio.jovihanni.com" target="_blank" rel="noopener noreferrer" className="text-blue-900">Jovihanni Casenas</a>.</div>
        </footer>
    )
}
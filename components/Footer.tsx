export default function Footer() {
    return (
        <footer className="my-12 text-center text-sm text-gray-500">
            <div>&copy; {new Date().getFullYear()} Bloomoji. All rights reserved.</div>
            <div>Source code can be found on <a href="https://github.com/JovihanniCasenas/bloomoji" target="_blank" rel="noopener noreferrer" className="text-blue-900">GitHub</a>.</div>
            <div>Created by <a href="https://portfolio.jovihanni.com" target="_blank" rel="noopener noreferrer" className="text-blue-900">Jovihanni Casenas</a>.</div>
        </footer>
    )
}
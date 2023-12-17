import "./style.css";

export const Layout = () => `   
    <nav>
        <a href="/" x-shell-route>home</a>
        <a href="/mfe-1" x-shell-route>mfe-1</a>
        <a href="/fragmented-2" x-shell-route>fragmented</a>
        <a href="/fragmented-4" x-shell-route>fragmented-4</a>
    </nav>
    <hr/>
    <div x-router></div>
`;

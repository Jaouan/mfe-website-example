import "./style.css";

export const Layout = () => `   
    <nav>
        <a href="/" x-shell-route>Home</a>
        <a href="/mfe-1" x-shell-route>mfe-1</a>
        <a href="/fragmented" x-shell-route>fragmented</a>
    </nav>
    <hr/>
    <div x-router></div>
`;

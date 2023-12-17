import "./style.css";

export const Layout = () => `   
    <nav>
        <a href="/" x-shell-route>home</a>
        <a href="/mfe-1" x-shell-route>mfe-1</a>
        <a href="/composition-default" x-shell-route>composition-default</a>
        <a href="/composition-side" x-shell-route>composition-side-by-side</a>
        <a href="/composition-4" x-shell-route>composition-4</a>
    </nav>
    <hr/>
    <div x-router></div>
`;

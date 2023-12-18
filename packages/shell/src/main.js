import { injectSpeedInsights } from "@vercel/speed-insights";
import.meta.env.PROD && injectSpeedInsights({ route: document.location.pathname || "/" });

(await import("layout/App")).default.mount(document.getElementById("layout"));

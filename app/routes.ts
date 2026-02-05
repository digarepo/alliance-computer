import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('routes/public/layout.tsx', [
        index("routes/home.tsx"),
        route("about", "routes/public/about.tsx"),
        route("contact", "routes/public/contact.tsx"),
        route("services", "routes/public/services/index.tsx"),
        route("services/geophysical", "routes/public/services/geo-physical.tsx"),
        route("services/it-infrastructure", "routes/public/services/it-infrastructure.tsx"),
    ])
] satisfies RouteConfig;

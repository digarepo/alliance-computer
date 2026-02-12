import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('routes/public/layout.tsx', [
        index("routes/home.tsx"),
        route("about", "routes/public/about.tsx"),
        route("contact", "routes/public/contact.tsx"),
        route("services", "routes/public/services/index.tsx"),
        route("services/geophysical", "routes/public/services/geo-physical.tsx"),
        route("services/it-infrastructure", "routes/public/services/it-infrastructure.tsx"),
    ]),

    route("admin/signin", "routes/admin/signin.tsx"),
    route("admin/signout", "routes/admin/signout.tsx"),

    // Protected Admin Panel
    layout("routes/admin/layout.tsx", [
        route("admin", "routes/admin/dashboard.tsx"),
        route("admin/hero", "routes/admin/hero.tsx"),
        route("admin/hero/preview", "routes/admin/hero.preview.tsx"),
        route("admin/services", "routes/admin/services/index.tsx"),
        route("admin/services/preview", "routes/admin/services.preview.tsx"),
        route("admin/sectors", "routes/admin/sectors.index.tsx"),
        // route("admin/services/new", "routes/admin/services/new.tsx"),
        // route("admin/services/:id/edit", "routes/admin/services/$id.edit.tsx"),
        // route("admin/portfolio", "routes/admin/portfolio/index.tsx"),
        // route("admin/portfolio/new", "routes/admin/portfolio/new.tsx"),
        // route("admin/portfolio/:id/edit", "routes/admin/portfolio/$id.edit.tsx"),
        // route("admin/contacts", "routes/admin/contacts.tsx"),
    ]),
] satisfies RouteConfig;

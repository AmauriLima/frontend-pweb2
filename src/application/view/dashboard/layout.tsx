import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/application/shared/components/ui/breadcrumb";
import { Separator } from "@/application/shared/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/application/shared/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { AppSidebar } from "./components/app-sidebar";
import { collapsibleItems } from "./layout-collapsible-items";
import { routePath } from "./layout-route-path";

export function DashboardLayout() {
  const { pathname } = useLocation();
  const [breadcrumb, setBreadCrumb] = useState<{label: string, route?: string}[]>([]);

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);

    const mappedBreadcrumb = pathSegments.map((segment) =>
      routePath[segment] ?? { label: segment }
    );

    setBreadCrumb(mappedBreadcrumb);
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar collapsibleItems={collapsibleItems} />
      <SidebarInset>
        <header className="flex h-[72px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
               {breadcrumb.map((page, index) => (
                <React.Fragment key={page.label + index}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      {page.route
                        ? <NavLink to={page.route}>{page.label}</NavLink>
                        : <span>{page.label}</span>}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumb.length - 1 > index && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
               ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="px-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

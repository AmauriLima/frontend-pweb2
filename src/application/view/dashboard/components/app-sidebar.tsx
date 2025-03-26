import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from "@/application/shared/components/ui/sidebar";

import UfcgLogo from '@/application/assets/ufcg-logo.png';
import { Roles } from "@/application/modules/account/services/dto/account-dto";
import { ProtectedComponent } from "@/application/shared/components/protected-component";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/application/shared/components/ui/collapsible";
import { Separator } from "@/application/shared/components/ui/separator";
import { cn } from "@/application/shared/lib/utils";
import { ChevronRight, LucideIcon } from "lucide-react";
import { NavLink } from "react-router";
import { NavUser } from "./nav-user";

export interface CollapsibleItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  rolesAllowed?: Roles[];
  items?: {
    title: string;
    url: string;
  }[]
}

interface Props {
  collapsibleItems: CollapsibleItem[]
}

export function AppSidebar({ collapsibleItems }: Props) {
  const { open } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center py-4 justify-center flex-row"  >
        <img src={UfcgLogo} alt="" className={cn("size-10", !open && "size-6")} />
        {open && 'Gerenciador de Biblioteca'}
      </SidebarHeader>
      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Páginas</SidebarGroupLabel>
          <SidebarMenu>
            {collapsibleItems.map(({ rolesAllowed, ...item}) => (
              <ProtectedComponent key={item.title} rolesAllowed={rolesAllowed}>
                <Collapsible
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <NavLink to={subItem.url}>
                                <span>{subItem.title}</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </ProtectedComponent>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter >
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

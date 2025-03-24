import {
  ChevronsUpDown,
  Cloud,
  LifeBuoy,
  LogOut,
  Settings,
  User
} from "lucide-react";

import { useMe } from "@/application/modules/account/hooks/use-me";
import { makeAuthService } from "@/application/modules/auth/services/make-auth-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/application/shared/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/application/shared/components/ui/sidebar";

import { ThemeToggle } from "@/application/shared/components/theme-toggle";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";


export function DropdownMenuSettings() {
  const { profile } = useMe();
  const navigate = useNavigate();
  const { isMobile } = useSidebar()

  const queryClient = useQueryClient();

  async function logout() {
    const authService = makeAuthService();

    queryClient.clear();

    authService.logout.bind(authService)();
    navigate('/auth/sign-in');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          tooltip="Configurações de conta"
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage alt={profile?.name} />
            <AvatarFallback className="rounded-lg">
              {profile?.name.split(' ').reduce((acc, current) => acc + current[0], '').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{profile?.name}</span>
            <span className="truncate text-xs">{profile?.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={profile?.name} />
                <AvatarFallback className="rounded-lg">
                  {profile?.name.split(' ').reduce((acc, current) => acc + current[0], '').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{profile?.name}</span>
              <span className="truncate text-xs">{profile?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ThemeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Suporte</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

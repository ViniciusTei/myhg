import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useCheckLogin } from "@/hooks"
import type { Metadata } from "next"
import Link from "next/link";

export const metadata: Metadata = {
  title: "My HG",
  description: "Developed by me for me.",
  icons: "/favicon.ico"
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useCheckLogin()

  return (
    <main className="h-full flex flex-col items-center justify-start">
      {children}

      <NavigationMenu className="bg-white mt-auto border-t border-gray-300 w-full text-gray-500">
        <NavigationMenuList className="my-1">
          <NavigationMenuItem>
            <Link href="/home" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div>
                  <Icon icon="alarm" size={16} className="mx-auto" />
                  <p className="text-xs">
                    Reminder
                  </p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/home/sites" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div>
                  <Icon icon="site" size={16} className="mx-auto" />
                  <p className="text-xs">
                    Sites
                  </p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/home" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Button className="rounded-full w-10 h-10" size="icon">
                  <Icon icon="scan" size={22} />
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/home/myplants" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div>
                  <Icon icon="plant" size={16} className="mx-auto" />
                  <p className="text-xs">
                    My Plants
                  </p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/home" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div>
                  <Icon icon="settings" size={16} className="mx-auto" />
                  <p className="text-xs">
                    Settings
                  </p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </main>
  );
}

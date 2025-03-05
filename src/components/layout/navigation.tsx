'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const links = [
    {
      name: 'Movies',
      path: '/movies',
    },
    {
      name: 'TV shows',
      path: '/tv-shows',
    },
    {
      name: 'Search',
      path: '/search',
    },
    {
      name: 'My lists',
      path: '/my-lists',
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center group cursor-pointer">
        {/* <Link href="/">
          <Image src="/images/logo.png" width={64} height={64} alt="logo" />
        </Link> */}
        <Link
          className={`${
            pathname == '/'
              ? 'text-foreground'
              : 'text-muted-foreground group-hover:text-foreground'
          } text-2xl transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent`}
          href="/"
        >
          Flixhunt
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.name}>
                <Link href={link.path} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle({
                      active: pathname === link.path,
                    })} text-muted-foreground hover:text-foreground bg-muted hover:bg-background`}
                  >
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}

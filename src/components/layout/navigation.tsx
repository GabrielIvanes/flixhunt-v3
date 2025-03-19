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
  console.log(pathname);
  console.log(pathname.includes('/movies'));

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
      name: 'Persons',
      path: '/persons',
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
              ? 'text-accent-foreground'
              : 'text-muted-foreground hover:text-accent-foreground'
          } text-2xl transition-colors`}
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
                      active: pathname.includes(link.path),
                    })} ${
                      pathname.includes(link.path)
                        ? 'text-accent-foreground'
                        : 'text-muted-foreground hover:text-accent-foreground'
                    }`}
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

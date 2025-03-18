import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '../ui/mode-toggle';
import { User } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import SignOut from '../auth/sign-out';
import Navigation from './navigation';
import { PiSignOut } from 'react-icons/pi';

interface Props {
  user: User;
}

export default function Navbar({ user }: Props) {
  const avatarFallback =
    user?.name && user.name.trim().length > 0
      ? user.name.split(' ').length > 1
        ? user.name
            .split(' ')
            .filter(Boolean)
            .map((word) => word[0].toUpperCase())
            .slice(0, 3)
            .join('')
        : user.name.slice(0, 2).toUpperCase()
      : '??';

  return (
    <div className="border border-[hsl(var(--border))] bg-card text-card-foreground mx-5 rounded-lg px-5 py-3 flex justify-between items-center sticky top-5 h-16 z-10">
      <Navigation />
      <div className="flex justify-center items-center gap-2">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {user.image && <AvatarImage src={user.image} />}
              <AvatarFallback className="flex justify-center items-center h-10 w-10 rounded-full border border-input hover:bg-accent">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <PiSignOut />
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

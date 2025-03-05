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
    <header className="bg-muted mx-5 mt-3 rounded-lg px-5 py-3 flex justify-between items-center">
      <Navigation />
      <div className="flex justify-center items-center gap-2">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {user.image && <AvatarImage src={user.image} />}
              <AvatarFallback className="flex justify-center items-center h-10 w-10 rounded-full bg-card text-card-foreground">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

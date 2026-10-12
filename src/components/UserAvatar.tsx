import React from 'react';
import { User as UserIcon } from 'lucide-react';

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = '',
  avatar = '',
  className = 'w-12 h-12 rounded-2xl',
  iconClassName = 'w-6 h-6',
  textClassName = 'text-sm'
}) => {
  // Discard any random unsplash photos that were previously assigned
  const hasValidCustomAvatar = Boolean(avatar && !avatar.includes('unsplash.com'));

  if (hasValidCustomAvatar) {
    return (
      <img
        src={avatar}
        alt={name || 'Profile Avatar'}
        className={`${className} object-cover`}
      />
    );
  }

  // Extract clean initials if name exists (supports 1 or 2 parts)
  const trimmed = name.trim();
  const initials = trimmed
    ? trimmed
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase())
        .join('')
    : '';

  return (
    <div
      className={`${className} bg-gradient-to-tr from-emerald-700 via-green-600 to-teal-600 text-white font-black flex items-center justify-center select-none shadow-xs shrink-0`}
      title={name || 'Farmer'}
    >
      {initials ? (
        <span className={`tracking-wider ${textClassName}`}>{initials}</span>
      ) : (
        <UserIcon className={iconClassName} />
      )}
    </div>
  );
};

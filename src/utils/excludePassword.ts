export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const clone = { ...user };
  keys.forEach((key) => delete clone[key]);
  return clone;
  // return Object.fromEntries<User>(Object.entries<User>(user).filter(([key]) => !keys.includes(key as Key))) as Omit<User, Key>;
}
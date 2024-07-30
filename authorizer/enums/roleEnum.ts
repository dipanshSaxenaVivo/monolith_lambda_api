export enum Role {
  User = 1 << 0,       // 1
  Support = 1 << 1,    // 2
  Admin = 1 << 2,      // 4
  SuperAdmin = 1 << 3,  // 8
  ALL = 1 << 4         // 16
}
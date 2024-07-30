import { Role, RouteEnums } from "enums";

const AdminRoutes = [
  RouteEnums["/test/encrypt"]
]

const SuperAdminRoutes = [
  RouteEnums["/test/decrypt"]
]

const SupportRoutes = [
  RouteEnums["/test/user/update"],
  RouteEnums["/test/user/delete"]
]

const UserRoutes = [] as any

const AllRoutes = [
  RouteEnums["/test/user/add"]
]

const route_permission_container = Object.freeze({
  [Role.SuperAdmin]: AllRoutes.concat(...AdminRoutes, ...SuperAdminRoutes, ...SupportRoutes, ...UserRoutes),
  [Role.Admin]: AllRoutes.concat(...AdminRoutes, ...SupportRoutes, ...UserRoutes),
  [Role.Support]: AllRoutes.concat(...SupportRoutes, ...UserRoutes),
  [Role.User]: AllRoutes.concat(...UserRoutes),
})

export default route_permission_container
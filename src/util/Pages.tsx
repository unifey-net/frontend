import Community from "../view/community/community/Community"
import ModerateCommunity from "../view/community/community/ModerateCommunity"
import User from "../view/user/User"
import Tos from "../view/Tos"
import Unsubscribed from "../view/Unsubscribed"
import About from "../view/about/About"
import Support from "../view/Support"
import Unverified from "../view/Unverified"
import Settings from "../view/settings/Settings"
import ForgotPassword from "../view/settings/Forgot"
import Verify from "../view/settings/Verify"
import Home from "../view/Home"
import Communities from "../view/community/communities/Communities"
import Login from "../view/account/Login"
import Logout from "../view/account/Logout"
import Privacy from "../view/Privacy"
import NotFound from "../view/NotFound"
import Notifications from "../view/account/Notifications"
import Friends from "../view/account/Friends"
import Register from "../view/account/Register"

type Page = {
    path?: string
    component: () => JSX.Element
    exact?: boolean
}

export default [
    ModerateCommunity,
    ...Community,
    ...User,
    Tos,
    Unsubscribed,
    About,
    Support,
    Unverified,
    Settings,
    ForgotPassword,
    Verify,
    Home,
    Notifications,
    Communities,
    Login,
    Logout,
    Privacy,
    Friends,
    Register,
    NotFound,
] as Page[]

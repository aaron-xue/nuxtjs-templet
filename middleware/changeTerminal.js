export default function ({ isServer, req, redirect, route }) {

    let isMobile = (ua) => {
        return !!ua.match(/AppleWebKit.*Mobile.*/)
    }
    let userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''

    // 如果终端为pc但路径中包含/m/或/m的，重定向到pc
    if ((route.fullPath.indexOf('/m/') > -1 || route.fullPath.indexOf('/m') > -1) && !isMobile(userAgent)) {
        let url = route.fullPath.substring(2)
        redirect(url)
    }

    //若终端为m而且当前路由的name在需要重定向到移动端的数组中，但路径中不包含/m/或/m，重定向到m
    let name = route.name
    let names = ['index','id']
    if (names.includes(name)) {
        if ((route.fullPath.indexOf('/m/') < 0 || route.fullPath.indexOf('/m') < 0) && isMobile(userAgent)) {
            redirect('/m' + route.fullPath)
        }
    }
}
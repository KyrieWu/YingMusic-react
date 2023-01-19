import service from "@/utils/service"

// use cellphone to login
export function toLogin(phone: string, password?: string, captcha?: string): Promise<Login> {
    let url: string = ''
    if (captcha) {
        url = `/login/cellphone?phone=${phone}&captcha=${captcha}`
    } else {
        url = `/login/cellphone?phone=${phone}&md5_password=${password}`
    }
    return service({
        url: url,
        method: "post",
    });
}

export function toLogout() {
    return service({
        url: '/logout',
        method: "post",
    });
}

//get user info
export function getUserInfo(id: number) {
    return service({
        url: `/user/detail?uid=${id}`,
        method: "get",
    });
}


// get /captcha
export function getCaptcha(phone: string) {
    return service({
        url: `/captcha/sent?phone=${phone}`,
        method: 'get'
    })
}
// check the captcha
export function checkCaptcha(phone: string, captcha: string) {
    return service({
        url: `/captcha/verify?phone=${phone}&captcha=${captcha}`,
        method: 'post'
    })
}
import {Snackbar} from "@varlet/ui";

export const isVip = (type:'isNotVip' | 'isNotNormal' | 'isNotPro')=>{
    switch(type){
        case 'isNotVip':
            Snackbar.error({
                content: "请购买会员！",
                duration: 1500,
            })
            return !localStorage.getItem('vip');
        case 'isNotNormal':
            Snackbar.error({
                content: "请购买普通机器人！",
                duration: 1500,
            })
            return localStorage.getItem('vip') == 'normal';
        case 'isNotPro':
            Snackbar.error({
                content: "请购买专业机器人！",
                duration: 1500,
            })
            return localStorage.getItem('vip') == 'pro';
        default:
            return false;
    }
}
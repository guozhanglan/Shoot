/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(): Promise<any>;

    login(): Promise<any>

    shareAppMessage(desc:string, imgUrl:string, callback:Function, callbackObj:any):void
    
    showVideoAd(adID:string, callback:Function, callbackObj:any):void
    
    showRank():void

    saveUserScore(score:number):void
    
    shakeMessage():void
    
    jumpApp(id:string):void
}

class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {

    }

    shareAppMessage(desc:string, imgUrl:string, callback:Function, callbackObj:any):void{
        callback.call(callbackObj, 0);
    }

    showVideoAd(adID:string, callback:Function, callbackObj:any):void{
        callback.call(callbackObj, 0);
    }

    shakeMessage():void{

    }

    showRank():void{

    }

    saveUserScore(score:number):void{
        
    }

    jumpApp(id:string):void{

    }
}
/*
class WXPlatform implements Platform {
    getUserInfo() {
        return wqq.WxTool.getInstance().userInfo;
    }
    login() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                    var province = userInfo.province;
                    var city = userInfo.city;
                    var country = userInfo.country;
                    wqq.WxTool.getInstance().userInfo = userInfo;
                    resolve(userInfo);
                }
            })
        });
    }
    shareAppMessage(callback:Function, callbackObj:any):void{
        wx.shareAppMessage({
            title: wqq.WxTool.getInstance().getShareDes(),
            imageUrl:wqq.WxTool.getInstance().getShareImg(),
            success: function (res) {
                callback.call(callbackObj, 0);
            },
            fail: function (res) {
                callback.call(callbackObj, 1);
            }
        });
    }
}
*/
if (!window.platform) {
    window.platform = new DebugPlatform();
}

declare let platform: Platform;

declare interface Window {
    platform: Platform
}






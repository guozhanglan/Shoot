module wqq {
	/**
	 *
	 * @author guoqing.wen
	 * @date 2017.9.14
	 * @description 通用玩家基础信息,解析平台数据，和保存服务器数据，生成服务器保存的数据
	 *res.data 的结构
        属性	类型	说明	支持版本
        avatarUrl	string	用户头像图片 url	
        city	string	用户所在城市	
        country	string	用户所在国家	
        gender	number	用户性别	
        language	string	显示 country province city 所用的语言	
        nickName	string	用户昵称	
        openId	string	用户 openId	
        province	string	用户所在省份
	 */
	export class ResPlayerInfoVo{
        public roleID: number;    //角色唯一ID openID（uint64）
        public avatarUrl:string;//	用户头像图片 url	
        public city : string;//	用户所在城市	
        public country	:string;//	用户所在国家	
        public gender	:string;//	用户性别	
        public language	:string;//	显示 country province city 所用的语言	
        public nickName	:string;//	用户昵称	
        public openId	:string;//	用户 openId	
        public province	:string;//	用户所在省份

		public constructor() {
    		
		}
		/**
		 * @description 解析平台数据
		 */
        public parseMsg(data: any): void {
            this.roleID = data.openId;
            this.avatarUrl = data.avatarUrl;
            this.city = data.city;
            this.country = data.country;
            this.nickName = data.nickName;
            this.province = data.province;
            this.roleID = data.openId;
            this.language = data.language;
            //性别 0：未知、1：男、2：女
            this.gender = data.gender == 1 ? "男" : "女";
        }
	}


	/**
	 * @description 微信工具类
	 */
	export class WxTool {
		private static instance:WxTool;
		public constructor() {
		}
		/**
		 * @description 获取单例
		 */
		public static getInstance():WxTool{
			if(WxTool.instance==null){
				WxTool.instance = new WxTool();
			}
			return WxTool.instance;
		}
		private _userInfoVo:ResPlayerInfoVo = new ResPlayerInfoVo();;
		private _userInfo:any;

		public ShakeEnable:boolean = true;
		public VideoAdID:string = null;
		public APPID_GAME_CENTER:string = null;
		/**
		 * set userInfo
		 */
		public set userInfo(info:any) {
			this._userInfoVo.parseMsg(info);
			this._userInfo = info;
		}
		
		public get userInfo():any {
			return this._userInfo;
		}

		public get shareDes():string{
			return "xxxx";
		}

		public get shareImg():string{
			return "xxxx";
		}
	}
}
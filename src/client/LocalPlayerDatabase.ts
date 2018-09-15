module wqq {
	/**每次登录获取的信息*/
	export class LoginInfo{
		//当前金币
		public goldCount:number = 10000;
      
        public currentScore: number;    //当前分数
        public goodScore: number;      //最佳分数
        public baoTouKillCount: number;      //爆头连击 次数 
        public currentPass: number;    //当前关卡
        public currentBoss: number;     //当前boss
     	public isGuide:boolean;

		public name:string;

		public avatarPath:string;
		public platform:string;
		public roleID:string;
	}


	export class LocalPlayerDatabase {
		public loginInfo:LoginInfo = null;
		public constructor() {
		}
		private static m_Instance:LocalPlayerDatabase = null;
		public static GetInstance():LocalPlayerDatabase
		{
			if (LocalPlayerDatabase.m_Instance == null) {
				LocalPlayerDatabase.m_Instance = new LocalPlayerDatabase();
			}
			return LocalPlayerDatabase.m_Instance;
		}

		public initLogin(){
			let info:LoginInfo = this.readPlayerData();
			// info.roleID = "1234001";
			// info.platform = "wx";
			// info.name = "文国清";
            // info.currentScore = 65;
            // info.goodScore = 452;
            // info.baoTouKillCount = 10;
            // info.isGuide = false;

			this.loginInfo = info;
            this.updatePlayerInfo();
		}

		public setUserInfo(userInfo:ResPlayerInfoVo){
			this.loginInfo.name = userInfo.nickName;
			this.loginInfo.avatarPath = userInfo.avatarUrl;
		}
		public setCurrentPass(currentPass: number){
			this.loginInfo.currentPass = currentPass;
            this.updatePlayerInfo();
		}
		public setGoodScore(goodScore: number){
			this.loginInfo.goodScore = goodScore;
            this.updatePlayerInfo();
		}

		public invalidGuide():void{
			this.loginInfo.isGuide = false;
			this.updatePlayerInfo();
		}
		public toAddCurrentScore(currentscore:number):void{
			this.loginInfo.currentScore += currentscore;
			this.updatePlayerInfo();
		}
        //游戏开始了 当前积分= 从0开始
		public invalidCurrentScore(currentscore:number):void{
			this.loginInfo.currentScore = currentscore;
			this.updatePlayerInfo();
		}
		public toAddGold(gold:number):void{
			this.loginInfo.goldCount += gold;
			this.updatePlayerInfo();
		}
		
		public toSubGold(gold:number):void{
			this.loginInfo.goldCount -= gold;
			this.updatePlayerInfo();
		}
		
	
		public updatePlayerInfo():void{
			let info:LoginInfo = this.loginInfo;
			let playerData = {
				gold:info.goldCount,
				guide:info.isGuide,
                curScore: info.currentScore,
                goodScore: info.goodScore,
                baoTouKill: info.baoTouKillCount
			
			};
            //本地数据 存储
			let objStr:string = JSON.stringify(playerData);
			egret.localStorage.setItem("wx.guoyu.shoot.playerData", objStr);
			lemon.NotifyManager.sendNotification(NotifyConst.PLAYER_INFO_UPDATE);
		}

		public readPlayerData():LoginInfo
        {
              //本地数据 读取
			let playerData = egret.localStorage.getItem("wx.guoyu.shoot.playerData");
			let info:LoginInfo = new LoginInfo();
			if (playerData){
				let p = JSON.parse(playerData);	
				info.goldCount = p.gold;
				info.isGuide = p.guide;
                info.currentScore = p.curScore;
                info.goodScore = p.goodScore;
                info.baoTouKillCount = p.baoTouKill;
                
		
			}
			else{
				info.isGuide = true;
				
			}
			return info;
		}

        
	}


    	export class RunConfig{
		//最初通关 1 从第一关开始
		public static INIT_PASS:number = 1;

		//最初分数 从0开始
		public static INIT_SCORE:number = 0;
		
		//最初枪 1
		public static INIT_WEAPONID:number = 1;
		
		//最初 玩家id
		public static INIT_PLAYERID:number = 8;

	}

}
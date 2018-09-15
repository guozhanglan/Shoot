/**
 *
 * @author honghong.guo
 * @date 2018.9.02
 * @description 游戏场景
 *
 */
module wqq{


	export class GameScene extends egret.DisplayObjectContainer{

		//单例
		private static m_GameSceneInstance: GameScene;

		//游戏通关 ID
		private _gamePassID: number = 1 ;

		//地图容器 
		private mapContainer: MapContainer;
		//地图背景文理 填充
        private mapBgTexture: MapBitmap;
		//ui_layer
		private _guidApp: app.GuidApp;//引导页
		private _mainApp: app.MainUIApp;//主界面 一直显示
		private _loginApp: app.LoginApp;//登陆界面
		private _rankApp: app.RankApp;//排行榜 界面
		private _reliveApp: app.ReliveApp;//复活界面
		private _battleScoreApp: app.BattleScoreApp;//本局得分
		private _rewardApp: app.RewardApp;//获得奖励


		private _monsterDataList: Array<MonsterData>;
		/* 单例**/
		public static getInstance(): GameScene
		{
			if(GameScene.m_GameSceneInstance == null)
			{
				GameScene.m_GameSceneInstance = new GameScene();
			}
			return GameScene.m_GameSceneInstance;

		}

		public constructor(){
			super();
		}
		private localPlayDB: LocalPlayerDatabase;
		private playInfo: LoginInfo;
			//开始游戏
		public async start()
		{
		
			this.width = MapConst.MAP_WIDTH;
			this.height = MapConst.MAP_HEIGHT;
		
		
			this._monsterDataList = LocalResources.getInstance().getMonsterData();	

			this.localPlayDB = LocalPlayerDatabase.GetInstance();	
			LocalPlayerDatabase.GetInstance().initLogin();	
			this.playInfo = this.localPlayDB.readPlayerData();
			//添加 地图背景
			this.addMapBgTexture();
			//添加 地图容器
			this.addMapContainer(); 
			
			this.openModule( NotifyConst.OPEN_MESSAGE_MAIN);
			if(true == this.playInfo.isGuide )
			{
				this.openModule( NotifyConst.OPEN_MESSAGE_GUID);
			}
			else
			{
				this.openModule( NotifyConst.OPEN_MESSAGE_LOGIN);
			}

		
			this.addNotifyMessage();
			//添加地图蒙版
			this.addMapContainerMask();
			
		}

	
		private mapContainerMaskShap: egret.Shape;
		private addMapContainerMask(): void
        {
            // let mapContainerMaskShap: egret.Shape ;
			if(null ==  this.mapContainerMaskShap )
			{
              this.mapContainerMaskShap = new egret.Shape();
			}
			this.mapContainerMaskShap.graphics.clear();
            this.mapContainerMaskShap.graphics.beginFill( 0xffffff, 0.8);
            this.mapContainerMaskShap.graphics.drawRect(this.x,this.y,this.width, this.height );
            this.mapContainerMaskShap.graphics.endFill();
            this.addChild(this.mapContainerMaskShap);
           
			this.mapContainer.mask = this.mapContainerMaskShap;
        }
		private reMoveMapContainerMask(): void
        {
			if(null != this.mapContainer.mask)
			{
				this.mapContainer.mask = null;
			}
			if(this.mapContainerMaskShap.parent && this.mapContainerMaskShap)
			{
			   this.mapContainerMaskShap.parent.removeChild(this.mapContainerMaskShap);
			}
        }

		private addGuild(): void
		{
			this._guidApp = LayerUIManager.openLayer(AppNameConst.GUID_MODULE);
		}
		

		private addNotifyMessage(): void
		{
			
			lemon.NotifyManager.registerNotify(NotifyConst.GAME_START,this.gameStart, this);
			lemon.NotifyManager.registerNotify(NotifyConst.GAME_OVER,this.gameOver, this);
            lemon.NotifyManager.registerNotify(NotifyConst.GAME_PLAYER_SHOOT_HIT,this.playerShootHit, this);

            lemon.NotifyManager.registerNotify(NotifyConst.OPEN_MODULE,this.openModule, this);
       
		}

		private openModule(notifyMessage: string):void
		{
			switch (notifyMessage) {

				case NotifyConst.OPEN_MESSAGE_BATTLESCORE:
					this._battleScoreApp = LayerUIManager.openLayer( AppNameConst.BATTLE_MODULE);
					break;
				case NotifyConst.OPEN_MESSAGE_LOGIN:
					this._loginApp = LayerUIManager.openLayer( AppNameConst.LOGIN_MODULE);
					break;
				case NotifyConst.OPEN_MESSAGE_RANK:
					this._rankApp = LayerUIManager.openLayer(AppNameConst.RANK_MODULE);
					break;
				case NotifyConst.OPEN_MESSAGE_REWARD:
					this._rewardApp =LayerUIManager.openLayer(AppNameConst.REWARD_MODULE);
					break;
				case NotifyConst.OPEN_MESSAGE_MAIN:
					this._mainApp =LayerUIManager.openLayer(AppNameConst.MAINUI_MODULE);
					break;
				case NotifyConst.OPEN_MESSAGE_GUID:
					this._guidApp =LayerUIManager.openLayer(AppNameConst.GUID_MODULE);
					break;
			
				default:
					break;
			}

		}
		//**游戏开始了 */
		private gameStart(): void
		{
			this.GamePassID = RunConfig.INIT_PASS;
		    this.localPlayDB.setCurrentPass(  RunConfig.INIT_PASS ) ;
			this.localPlayDB.invalidCurrentScore(  RunConfig.INIT_SCORE ) ;
	
			this.reMoveMapContainerMask();
			this._loginApp.dispos();
		}
		private currentMonsterData:MonsterData ;

	
		/**玩家命中 怪物*/
		public 	playerShootHit(): void
		{
			//当前命中 XX  
		    this.currentMonsterData = 	this._monsterDataList[this.GamePassID - 1];
			LocalPlayerDatabase.GetInstance().toAddGold(this.currentMonsterData.getConfData( "gold") ) ;
			LocalPlayerDatabase.GetInstance().toAddCurrentScore(this.currentMonsterData.getConfData( "hp") ) ;//打几滴血 就几分
			LocalPlayerDatabase.GetInstance().setCurrentPass(this.currentMonsterData.getConfData( "gid") ) ;//打几滴血 就几分
	
			console.log("你打了第 "+ this.GamePassID +" 流程 id");//设置最佳分数
			let playInfo = LocalPlayerDatabase.GetInstance().readPlayerData();
			if(playInfo.currentScore > playInfo.goodScore)
			{
				LocalPlayerDatabase.GetInstance().setGoodScore(playInfo.currentScore);
			}

			//获取下一关卡的数据
			this.GamePassID = this.GamePassID + 1;
			this.currentMonsterData = 	this._monsterDataList[this.GamePassID -1];
		}
		public 	getCurrentMonsterData(): MonsterData
		{
			this.currentMonsterData = 	this._monsterDataList[this.GamePassID - 1];
			return this.currentMonsterData;
		}
		public getPassID(): number//获取当前的关卡
		{
			return this.getCurrentMonsterData().getConfData("gid");

		}
		 //获取下一关卡  怪物信息
		public getMonsterData():MonsterData
         {
          

			//获取下一关卡的数据
			// this.GamePassID = this.GamePassID + 1;
			let data: MonsterData 
			data = 	this._monsterDataList[this.GamePassID -1];
			return data;
             

         }

		//**游戏结束 ，你被毙了吧 */
		private gameOver(): void
		{
			this.addMapContainerMask();
			this._reliveApp = LayerUIManager.openLayer( AppNameConst.RELIVE_MODULE);


		}
	
	
		// 添加地图
        private addMapContainer()
		{
			
			this.mapContainer = new MapContainer();
			this.addChildAt(this.mapContainer, 1);
			this.mapContainer.width = MapConst.MAP_WIDTH;
			this.mapContainer.y = MapConst.MAP_HEIGHT;
			
		}
		//**添加地图背景文理 */
        public addMapBgTexture(): void
        { 
            
            this.mapBgTexture = new MapBitmap();
            this.addChildAt(this.mapBgTexture ,0 );
            this.mapBgTexture.source = MapConst.RES_MAPROOT_URL.concat("bg.png" ); 

			this.mapBgTexture.fillMode = egret.BitmapFillMode.REPEAT;
            this.mapBgTexture.height = MapConst.MAP_HEIGHT;
            this.mapBgTexture.width = MapConst.MAP_WIDTH;   
       
        }
		//**排版 complete*/
        public toLayer(): void
        {
            this.mapBgTexture.fillMode = egret.BitmapFillMode.REPEAT;
            this.mapBgTexture.height = MapConst.MAP_HEIGHT;
            this.mapBgTexture.width = MapConst.MAP_WIDTH;   
     
        }
	

		private ontick(stamp: number): boolean
		{
		
			return true;
		}

		
		/**
		 * centerModule
		 */
		public centerModule() {
			this.x = (lemon.StageUtil.stageWidth - this.width)/2;
			this.y = (lemon.StageUtil.stageHeight - this.height)/2;
		}
	  
		
	
		
		 //**X */
		 public get GameScenePointX(): number
		 {
			   return this.x;

		 }
		  //**Y */
		 public get GameScenePointY(): number
		 {
			   return this.y;

		 }
		public set GamePassID(value: number)
		{
			this._gamePassID = value;
		}
		public get 	GamePassID(): number
		{
			return this._gamePassID;
		}
		

	}
}
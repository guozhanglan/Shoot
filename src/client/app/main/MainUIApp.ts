module wqq.app {
	/**
	 * @description
	 * 主界面
	 */
	export class MainUIApp extends BaseApp {
		public main_scene:eui.Group;
		public main_bg:eui.Group;
		public line_left:eui.Image;
		public line_right:eui.Image;
		public expend_group:eui.Group;

		public main_Rmb: eui.Group;
		public main_Buff: eui.Group;
		public progressBarPass: eui.ProgressBar;
		public txtPassID: eui.Label;//关卡进度

		public txtRmb: eui.BitmapLabel;//金币
		public txtScores: eui.BitmapLabel;//当前积分
		


		public txtOneKill: eui.Label;//buff 一键击毙
		public txtAddBlood: eui.Label;//buff 加血


		public constructor() {
			super();
			this.skinName = "MainUI";
			this.isEvery = true;
	
	
		}
		protected update(){
			this.txtRmb.text = LocalPlayerDatabase.GetInstance().readPlayerData().goldCount.toString();
			this.txtScores.text =  LocalPlayerDatabase.GetInstance().readPlayerData().currentScore.toString();

			
			/**进度条 */
			 this.progressBarPass.visible = true;
			 let monsterData  = LocalResources.getInstance().getMonsterDataByPass();
			 let len = monsterData[	this.currentMonster.getConfData("gid")].length;
			 this.progressBarPass.value = (GameScene.getInstance().GamePassID)%len * (100/len);

			 this.progressBarPass.labelFunction = this.onlabelFunction;
	

			 if( 0 == (GameScene.getInstance().GamePassID)%len  )
			 {
				 this.effectOut();
			 }
			 else if( 1 == (GameScene.getInstance().GamePassID)%len  )
			 {
				  this.effectIn();
			 }
		
		
			
		}

		private currentMonster: MonsterData;

		private effectIn(): void
		{
			let tween = egret.Tween.get(this.progressBarPass, {loop : false});
			tween.to({ alpha: 1 }, 1000, egret.Ease.backIn);
		
		}
		private effectOut(): void
		{
			let tween = egret.Tween.get(this.progressBarPass, {loop : false});
			tween.to({ alpha: 0 }, 1000, egret.Ease.backInOut);
		
		}
		private onlabelFunction(value: number, maximum: number): string
		{
			let pass = GameScene.getInstance().getPassID() ;
		
			return "第 " + pass + " 关";
			
		}
		
		
		public progressBarLabel: eui.Label;

		private self:any;
		/*
		 ** @description 初始化组件
         */
		protected initComponent(): void {
			this.currentMonster =  GameScene.getInstance().getCurrentMonsterData();
			this.self = this;
		

			this.progressBarPass.visible = false;
			this.txtOneKill.text = "9";
			this.txtAddBlood.text  = "9";

			this.main_Buff.visible = false;
			this.progressBarPass.visible = false;
			this.main_Buff.visible = false;
			

			this.update();

		}
		public ongTick(s: number): boolean
		{
			this.progressBarPass.value ++;
			return;

		}
	
        /**
         * @description 初始化事件
         */
		protected initListener(): void {
			super.initListener();
			//第一步新手指引
			//lemon.NotifyManager.registerNotify(NotifyConst.FIRST_GUIDE, this.openGuide, this);
            //切换地图,进入所有副本，则隐藏顶部栏
            //lemon.NotifyManager.registerNotify(NotifyConst.RES_ENTER_MAP_COMPLETE, this.setMapInfo, this);

			//游戏开始了
            lemon.NotifyManager.registerNotify(NotifyConst.GAME_START, this.gameStart, this);
            lemon.NotifyManager.registerNotify(NotifyConst.PLAYER_INFO_UPDATE, this.update, this);
		}
        //**游戏开始 */
		protected gameStart(){
			// this.main_Buff.visible = true;

		}
		
		protected onStageResize(){
			this.width = lemon.StageUtil.stageWidth;
            this.height = lemon.StageUtil.stageHeight;
		}
        /**
         * @description 初始化数据
         */
		protected initData(): void {
			super.initData();
		}
	}
}
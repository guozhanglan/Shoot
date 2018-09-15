module wqq.app {
	/**
	 * 登陆界面
	 */
	export class LoginApp extends BaseApp{
		public btnEnterToClassic:eui.Button;
		public btnEnterToBoss:eui.Button;

		public btnRank:eui.Button;
		public btnShare:eui.Button;
		public btnMore:eui.Button;
		public btnMusic:eui.Button;

	
		public txtBaoTouKilled:eui.BitmapLabel;//爆头连击
		public txtScore:eui.BitmapLabel;//最佳得分 积分
		
		public constructor() {
			super();
			this.baseSkinName = "LoginSkin";
		}

		protected initComponent(): void {
				this.txtBaoTouKilled.scaleX = 0.46;
				this.txtBaoTouKilled.scaleY = 0.46;

				this.txtScore.scaleX = 0.46;
				this.txtScore.scaleY = 0.46;
				this.txtBaoTouKilled.text = LocalPlayerDatabase.GetInstance().readPlayerData().baoTouKillCount.toString();
				this.txtScore.text = LocalPlayerDatabase.GetInstance().readPlayerData().goodScore.toString();
				//功能以后扩展
				this.btnEnterToBoss.visible = false;


			
		}

		protected initListener(): void {
			super.initListener();

			this.addClickEvent(this.btnEnterToClassic, this.onClickEnterToClassic, this);
			this.addClickEvent(this.btnEnterToBoss, this.onClickEnterToBoss, this);
			this.addClickEvent(	this.btnRank, this.onClickRank, this);
			this.addClickEvent(this.btnShare, this.onClickShare, this);
			this.addClickEvent(this.btnMore, this.onClickMore, this);
			this.addClickEvent(this.btnMusic, this.onClickMusic, this);
		
		}

		protected onStageResize(): void {
			super.onStageResize();
			this.width = lemon.StageUtil.stageWidth;
			this.height = lemon.StageUtil.stageHeight;
		}

		protected onClickEnterToClassic(): void {
			
		    console.log("clicked");
			this.EnterGame();
		}
		protected onClickEnterToBoss(): void {
			
		    console.log("clicked");
		}
		protected onClickRank(): void {
			
		    console.log("clicked");
			lemon.NotifyManager.sendNotification(NotifyConst.OPEN_MODULE, NotifyConst.OPEN_MESSAGE_RANK);
		}
		protected onClickShare(): void {
			
		    console.log("clicked");
		}
		protected onClickMore(): void {
			
		    console.log("clicked");
		}
		protected onClickMusic(): void {
			
		    console.log("clicked");
		}

		protected async EnterGame(){
			await this.loadResource()
			AppModuleManager.closeModule(AppNameConst.LOGIN_MODULE);
			lemon.NotifyManager.sendNotification(NotifyConst.GAME_START);
       	
		}

		private async loadResource() {
			try {
				const loadingView = new LoadingUI();
				lemon.StageUtil.stage.addChild(loadingView);
				await RES.loadGroup("game", 0, loadingView);
				lemon.StageUtil.stage.removeChild(loadingView);
			}
			catch (e) {
				console.error(e);
			}
		}
	}
}
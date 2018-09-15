module wqq.app {
	/**
	 * 引导页界面 
	 */
	export class GuidApp extends BaseApp{
		
        public btnShou: eui.Button

		public constructor() {
			super();
			this.baseSkinName = "GuidUI";
		}

		protected initComponent(): void {

            lemon.TweenEffectUtil.skip2(this.btnShou, 30,3000);

			
		}

		protected initListener(): void {
			super.initListener();
            this.addClickEvent(this.btnShou, this.btnShouClicked, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnShouClicked, this, false);
		
		}
	
		protected close(event:egret.TouchEvent): void {
			
		   this.btnShouClicked();
		}
		protected btnShouClicked(): void {
			
		    console.log("btnShouClicked");
            this.dispos();
            LocalPlayerDatabase.GetInstance().invalidGuide();
            
            lemon.NotifyManager.sendNotification(NotifyConst.OPEN_MODULE, NotifyConst.OPEN_MESSAGE_LOGIN);
		}

	}
}
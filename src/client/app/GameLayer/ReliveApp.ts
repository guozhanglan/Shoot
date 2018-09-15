module wqq.app {
	
     /**
      * 复活界面
      */
    export class ReliveApp extends BaseApp{

        private BtnToSeeVadio: eui.Button;
        private BtnToGo: eui.Button;//点击跳过

        private txtTimer: eui.BitmapLabel;//倒计时
        private txtScores: eui.BitmapLabel;//本局分数

        private countDownTime: number = 9;
		

		public constructor() {
			super();
			this.baseSkinName = "ReliveUI";

		}

		protected initComponent(): void {
            this.txtTimer.text = this.countDownTime.toString();
            this.txtScores.text = LocalPlayerDatabase.GetInstance().readPlayerData().currentScore.toString();

			
		}

        private timeKey: number;

		protected initListener(): void {
			super.initListener();
            this.addClickEvent(this.BtnToGo, this.onToGo, this);
            // egret.startTick(this.onTick, this);
            this.timeKey = egret.setInterval(this.onCountDown, this, 1000)
		
		}
        /**倒计时 */
		protected onCountDown(stamp: number): void
        {
            
            this.countDownTime--;
            console.log("倒计时！");
            if(this.countDownTime == 0)
            {
         
                this.dispos();
                 lemon.NotifyManager.sendNotification(NotifyConst.OPEN_MODULE, NotifyConst.OPEN_MESSAGE_BATTLESCORE);
            }
            else
            {

                this.txtTimer.text = this.countDownTime.toString();
            }
		 
		}
        /**
		 * @description 资源释放
		 */ 
		public dispos():void{
            super.dispos();

            egret.clearInterval(this.timeKey);

    		
		}

	
		protected onToGo(): void {
			
		    console.log("点击跳过");
             this.dispos();
            lemon.NotifyManager.sendNotification(NotifyConst.OPEN_MODULE, NotifyConst.OPEN_MESSAGE_BATTLESCORE);
		}

	}
}
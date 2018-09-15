/**
 * BattleScoreUI
 * @author guohonghong
 * @description 本局得分
*/
module wqq.app{

    export class BattleScoreApp extends BaseApp{

		private txtBattleScores:eui.BitmapLabel;//本局得分
		private txtGoodScroces:eui.Label;//最佳得分
		private main_Buff:eui.Group;//buff
        private btnToMainUI:eui.Button;//回到主页
        private btnToGoAgain:eui.Button;//再玩一局
        private btnToShare:eui.Button;//炫耀战绩

	public constructor() {
			super();
			this.baseSkinName = "BattleScoreUI";

		}

		protected initComponent(): void {

			this.txtBattleScores.text = LocalPlayerDatabase.GetInstance().readPlayerData().currentScore.toString();
			this.txtGoodScroces.text = LocalPlayerDatabase.GetInstance().readPlayerData().goodScore.toString();
            this.main_Buff.visible = false;
		}

        private timeKey: number;

		protected initListener(): void {
			super.initListener();
            this.addClickEvent(this.btnToGoAgain, this.onToMain, this);
            this.addClickEvent(this.btnToMainUI, this.onToMain, this);
            
		}
        /**再来一局 */
		private onToAgain(stamp: number): void
        {
            
		}
        /**回到登陆页面 */
		private onToMain(): void {
			
		    console.log("回到登陆页面");
            this.dispos();
            lemon.NotifyManager.sendNotification(NotifyConst.OPEN_MODULE, NotifyConst.OPEN_MESSAGE_LOGIN);
		}
    }
}
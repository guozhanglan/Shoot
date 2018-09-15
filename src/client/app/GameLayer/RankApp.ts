module wqq.app {
	/**
	 * 排行榜界面 
	 */
	export class RankApp extends BaseApp{
		

		public constructor() {
			super();
			this.baseSkinName = "RankUI";
		}

		protected initComponent(): void {
				


			
		}

		protected initListener(): void {
			super.initListener();

		
		
		}
	
		protected onClickMusic(): void {
			
		    console.log("clicked");
		}

	}
}
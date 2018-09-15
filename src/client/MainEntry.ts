module wqq {
	export class MainEntry
	{
		private root:Main;
		private uiLayer:eui.UILayer;
		private stage:egret.Stage;
		public constructor() {
		}

		 /**
		  * setup
		  */
		 public setup(root:Main) {
			 this.root = root;
			 this.stage = root.stage;
			 this.uiLayer = new eui.UILayer();
			 root.addChild(this.uiLayer);
			 wqq.LayerManager.getInstance().init(this.uiLayer);

			 lemon.StageUtil.stage = this.stage;
        	 lemon.StageUtil.init();
			 egret.ImageLoader.crossOrigin = "anonymous";

			 LanaguageManager.getInstance().locale = LanguageType.ZH_CN;

			 JsonDataManager.getInstance().loadConfig();
			//  SingleModel.getInstance().initAllModel();
			 LocalResources.getInstance().initCfg();
			 //进入场景
		    GameScene.getInstance();
            GameScene.getInstance().start();
        
			LayerManager.getInstance().addDisplay( GameScene.getInstance(), LayerConst.MAP_LAYER );
			 //注释登录模块
			// AppModuleManager.openModule(AppNameConst.MAINUI_MODULE);//主模块打开
			
			

		 }
	}
}
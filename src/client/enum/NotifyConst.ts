module wqq {
	export class NotifyConst {
		public constructor() {
		}
		public static RES_HERO_HP_CHANGE: string = "res_hero_hp_change";//玩家血量发生变化
		public static RES_CANCEL_FOLLOW: string = "res_cancel_follow";//取消追踪

		public static SHOOT_GET_HIT: string = "shoot_get_hit" ;
		public static SHOOT_GET_BODYNODE_HIT: string = "shoot_get_bodyNode_hit" ;
		public static SHOOT_OVER: string = "shoot_over" ;//发射完成了
		public static MAP_SHOOT_OVER: string = "map_shoot_over" ;//发射完成了
		
		public static MAP_LOAD: string = "map_loaded" ;

		public static GO_UP_FLOOR_OVER: string = "onGoUpFloor" ;//我要爬楼梯了

		///game ----------------
		public static GAME_START: string = "game_start" ;//游戏开始了
		public static GAME_OVER: string = "game_over" ;//游戏结束了 你被怪物毙了
		public static GAME_PLAYER_SHOOT_HIT: string = "game_player_shoot_hit" ;//你命中怪物了 要算金币  关卡了 
	
		public static SHOW_RMB: string = "show_rmb" ;//金币 什么数据刷新
		///玩家信息更新
		public static PLAYER_INFO_UPDATE: string = "player_info_update" ;

		//OPEN_MODULE
		public static OPEN_MODULE: string = "open_module" ;//打开面板
		public static OPEN_MESSAGE_BATTLESCORE: string = "open_battleScore" ;//复活之后 得到本局得分
		public static OPEN_MESSAGE_RANK: string = "open_rank" ;//打开排行榜
		public static OPEN_MESSAGE_LOGIN: string = "open_login" ;//打开登录界面
		public static OPEN_MESSAGE_REWARD: string = "open_reward" ;//打开奖励
		public static OPEN_MESSAGE_MAIN: string = "open_main" ;//打开main
		public static OPEN_MESSAGE_GUID: string = "open_guid" ;//打开引导
		
	
		
	}
}
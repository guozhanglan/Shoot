module wqq {
	/**
	 * @author guoqing.wen
	 * @date 2018.2.08
	 * @description 动作状态枚举
	 */
	export class RoleConst {
		public static RES_ROLEROOT_URL:string   = "resource/res/sprite/";        //角色  资源根目录
		public static RES_WEAPON_URL:string   = "weapon_M";        //角色  资源根目录
		public static RES_ROLE_URL:string   = "role_P";        // 玩家
		public static RES_MONSTER_URL:string   = "role_M";        // 怪物

		public static RES_PNG:string   = ".png";        // 图片文件后缀

		public static ROLE_DEFAULT_HP:number   = 1;        // 怪物默认多少滴血
		public static ANGLE_CHANGE:number   = 65;        // 枪 旋转 角度
		public static ANGLE_180:number   = 180;        // 平角

		
        // player monseter 
        public static ROLE_TYPE_PLAYER: number  = 1;
        public static ROLE_TYPE_MONSTER: number  = 2;

        	
		public static ROLE_SHOOT_IS_HIT: number = 1 ;//命中了
		public static ROLE_SHOOT_ISNOT_HIT: number =2 ;// 没有命中了
		public static ROLE_SHOOT_HASNOT_HIT: number = 3;// 没有开始结果
		

		public static MOVE:string        = "walk";            //行走状态
		public static ATTACK:string      = "action";          //攻击状态
		public static ATTACK_1:string      = "action1";          //攻击状态

		public static BATTLE_START:number      = 1;          //开始战斗
		public static BATTLE_STOP:number      = 2;          //暂停战斗
		public static BATTLE_OVER:number      =  3;          //战斗结束战斗

		//**shoot 切换 */
		public static SHOOT_START:number      = 1;          //开始发射
		public static SHOOT_STOP:number      = 2;          //暂停发射

		public static SHOOT_OVER:number      =  3;          //结束发射 游戏over


		//---id
	    public static ROLE_PLAYER_ID:number  = 12;          //玩家id
	    public static ROLE_MONSTER_ID:number  = 22;          //怪物id


		public static ROLE_DIRECTION_RIGHT: number = 1; //初始化向右 → → →
		public static ROLE_DIRECTION_LEFT: number = -1;//ScaleX = -1 向左 ← ← ←

		public static ROLE_BODY_HEIGHT: number = 180;//ScaleX = -1 向左 ← ← ←
		public static ROLE_BODY_WIDTH: number = 180;// 中心點

		public static ROLE_LEVEL: number = 1000;// 层级

		public static SHOOT_TIME: number = 2000;// 5000ms
		public static TIME_100_MS: number = 100;// 100ms
	
		public static SCALE_Y_DOUBLE: number = 2;//  放大倍数
		public static SCALE_X_DOUBLE: number = 2;//  放大倍数
		public static SCALE_X_TURNOVER_DOUBLE: number = -2;//  放大倍数


		public static ROLE_BLOOD_MAX_VALUE: number = 100;//血条的最大值
		public static ROLE_BLOOD_MIN_VALUE: number = 0;//血条的最小值

		public static ROLE_BLOOD_WIDTH: number = 250;//血条的宽度
		public static ROLE_BLOOD_HEIGHT: number = 120;//血条的高度 

		public static ROLE_BLOOD_OFFSET_X: number = 90;
		public static ROLE_BLOOD_OFFSET_Y: number = -20;

		public static ROLE_BLOOD_PLAY_SKIN: string = "resource/eui_skins/ProgressBarSkin_Role.exml";
		public static ROLE_BLOOD_MONSTER_SKIN: string = "resource/eui_skins/ProgressBarSkin_Monster.exml";


		public static ROLE_BODY_PR_URL: string = "role_P";
		public static ROLE_BODY_URL: string = "role_P";

		public static ROLE_OFFSET_WEAPON_X: number = 65;//固定偏移 武器坐标X 
		public static ROLE_OFFSET_WEAPON_Y: number = 105;//固定偏移 武器坐标Y 

		public static ROLE_BOSS_MIN_ID: number = 1;//BOSS怪物的 最小值ID
		public static ROLE_BOSS_MAX_ID: number = 23;//BOSS怪物的 最大值ID
		public static ROLE_MONSTER_MIN_ID: number = 1;//怪物的 最大值ID
		public static ROLE_MONSTER_MAX_ID: number = 8;//怪物的 最大值ID

		public static CFG_MONSTER_BOSS_TYPE: number = 1;//怪物 是BOSS



		
	}
}

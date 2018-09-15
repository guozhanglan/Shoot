module wqq {
	/**
	 * @author guoqing.wen
	 * @date 2018.2.08
	 * @description 动作状态枚举
	 */
	export class MapConst {
		public static RES_MAPROOT_URL:string   = "resource/res/map/";        //地图根目录
	
		public static MAP_HEIGHT:number   =  1920;    //地图高度
		public static MAP_WIDTH:number   = 1080  ;      //地图宽度

		public static MAP_SPRITE_HEIGHT:number   = 92   ; // 阶梯高度 重叠
		public static MAP_SPRITEBG_HEIGHT:number   = 440   ; // 阶梯高度

		public static MAP_STEPS:Array<number> = [2,3,4,5]  ; // 阶梯高度

		public static MAP_FLOOR_HEIGHT:number = 90 ; // 一个台阶 高度

		public static MAP_TO_ROLE_SPACE = 108//人和台阶 的间距  踩草坪

		public static MAP_UP_TIME: number = 300;// 地图滚动时间

		public static MAP_ROLE_STEP_TIME: number = 80;// 人上阶梯的时间
		public static MAP_ROLE_STEP_WAIT_TIME: number = 30;// 人上阶梯的时间

    
	}
}

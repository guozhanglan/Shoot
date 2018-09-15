	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 角色基类
	 *
	 */
 module wqq{

	export const WEAPON_SECTORSHAP_RADIUS  = 100 ; //扇形 半径
	export const WEAPON_SECTORSHAP_STAMP  = 40 ; //时间戳

    export class NodeWeaponSector extends Node{
		// 枪扇形
     
        public weaponTarge: wqq.NodeWeapon;

		private toDirection: number;

		private toRotateAngle : number;

        public constructor(parentTarget: wqq.BaseRoleContainer){
            super(parentTarget);
			 this.name = "NodeWeaponSector";
        }

	    public initNode(): void
        {
            this.toDrawSectorShap();
	
        }
        public set WeaponTargeSet(value: wqq.NodeWeapon)
        {
            this.weaponTarge = value;
        }
        public get WeaponTargeGet(): wqq.NodeWeapon
        {
            return this.weaponTarge;
        }
	

		private toDrawSectorShap()
		{
			// var angle : number = 0;
			egret.startTick(this.onTick, this);
		}
		private angleChange:number = 0
		private lastTime: number = 0;
		
		private onTick(timeStamp: number): boolean
		{
			// var angle : number = 0;
			
			if(timeStamp - this.lastTime > WEAPON_SECTORSHAP_STAMP)
			{
				this.lastTime = timeStamp;

			}
			else{
					return true;
			}
			this.onTickToChange();
			return true;
		}
		private onTickToChange()
		{
			this.angleChange = this.angleChange - 1;
		    this.angleChange = this.angleChange %   RoleConst.ANGLE_CHANGE ; 
			this.changeGraphics(this.angleChange);
		}
		private changeGraphics(angle: number)
		{
				let sectorShapeOriginX =  0 ;
				let sectorShapeOriginY =  0;
				let sectorShapeRadius = WEAPON_SECTORSHAP_RADIUS;
                
				this.graphics.clear();
				// this.graphics.lineStyle(2, 0xfff000);
				this.graphics.beginFill (0xffffff, 0.2);
				this.graphics.moveTo (sectorShapeOriginX,sectorShapeOriginX);
				// this.graphics.lineTo (500,50);
				this.graphics.drawArc(0,0,sectorShapeRadius,0,angle*Math.PI/180,true);
				this.graphics.lineTo (0 ,0);
				this.graphics.endFill();
				this.weaponTarge.rotation = angle ;
		
		}
		public toShootStop( ):void
		 {
			console.log("toShootStop")
			egret.stopTick(this.onTick , this );
			this.weaponTarge.rotation = 0;
		    this.graphics.clear() ;
		 }

		 public toShootStart():void
		 {
			console.log("toShootStart");
			this.graphics.clear() ;
			this.angleChange = 0;
			this.visible = true;
			egret.startTick(this.onTick , this );
		  
		 }
		 public toShootBullet():void
		 {
		
			egret.stopTick(this.onTick , this );
			this.angleChange = 0;
			this.visible = false;
		    this.graphics.clear() ;

		 }

		 public dispos():void
		 {
			super.dispos();
		
			this.weaponTarge = null;
			egret.stopTick(this.onTick , this );
		
			
		 }

     
    }
 }
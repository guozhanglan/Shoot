	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 角色基类
	 *
	 */
 module wqq{


		
		
    export class WeaponContainer extends wqq.Node{
		// 枪
        public weaponNode: wqq.NodeWeapon;
        // 扇形
        private weaponSectorNode: wqq.NodeWeaponSector;

		private toDirection: number;

		private toRotateAngle : number;

        public constructor(parentTarget: wqq.BaseRoleContainer){
            super(parentTarget);
			 this.name = "WeaponContainer";
             this.initData();
        }
        public  initData()
        {
            this.weaponNode = new wqq.NodeWeapon(this.parentTarget);
            this.weaponNode.source = this.parentTarget.weaponUrl;
            this.addChild(this.weaponNode);
			this.toLayer();
			
	
			//test guohonghong
			// if(this.parentTarget.roleType == RoleConst.ROLE_TYPE_PLAYER)
			// {
			// 	this.addWeaponSectorNode();
			// }
				this.addWeaponSectorNode();
				lemon.NotifyManager.registerNotify(NotifyConst.SHOOT_OVER,this.shootOver, this);
		
        }
		 public addWeaponSectorNode(): void
        {
		
				if(this.parentTarget.roleType == RoleConst.ROLE_TYPE_PLAYER)
				{
					this.weaponSectorNode = new wqq.NodeWeaponSector(null);
					this.addChildAt(this.weaponSectorNode, 0);

					// let weaponSectorNode = <wqq.NodeWeaponSector>this.weaponSectorNode;

					// let weaponNode = <wqq.NodeWeapon>this.weaponNode;
					// this.weaponSectorNode.weaponTarge = this.weaponNode;
					this.weaponSectorNode.weaponTarge = this.weaponNode;
					
				}
			
		
		}
		public removeWeaponSectorNode(): void
        {
			if(this.parentTarget.roleType == RoleConst.ROLE_TYPE_PLAYER)
			{
				this.weaponSectorNode.dispos();
				if(null !=  this.weaponSectorNode.parent )
				{
				   this.weaponSectorNode.parent.removeChild(this.weaponSectorNode);
				}
			
			}
		
		}


	    public initNode(): void
        {
			

            this.width = this.weaponNode.width;
            this.height = this.weaponNode.height;
       
            console.log(this.name+" onLoaderComplete: 坐标"+ "["+"x:" +this.x + "y:"+ this.y +"]"+ " ["+"width:" +this.width + "height:"+ this.height +"]");

		
        }

        public toLayer():void
        {
			
			// this.initNodePoint(roleVo.weaponX,roleVo.weaponY,roleVo.weaponAnchorX,roleVo.weaponAnchorY);
            console.log("toLayer");
			console.log(this.name +" == render== "+ "["+"x:" +this.x + "y:"+ this.y +"]"+ " ["+"width:" +this.width + "height:"+ this.height +"]");
			
            // 武器偏移人身体 坐标
			this.x = RoleConst.ROLE_OFFSET_WEAPON_X;
			this.y = RoleConst.ROLE_OFFSET_WEAPON_Y;
        }
	     public toShootStop( ):void
		 {
			if(null != this.weaponSectorNode || undefined != this.weaponSectorNode)
			{
					this.weaponSectorNode.toShootStop();
			}
			this.weaponNode.toShootStop()
		 }
		 //**开始射击 */
	     public toShootStart( ):void
		 {
		
			if(null != this.weaponSectorNode || undefined != this.weaponSectorNode)
			{
					this.weaponSectorNode.toShootStart();
			
			}
			this.weaponNode.toShootStart()
		 }

		 
		
		//  private Nodebullet:NodeBullet;
		// player monster
	     public toShootBullet(roleType:number, rotaionToShoot?: number):void
		 {
			 var bullet : NodeBullet;
			 let rotaion: number;
			if(egret.is(this.parent, "wqq.Player"))
			 {
				 rotaion =  this.weaponNode.rotation ;
				 bullet = new NodeBullet(rotaion) ;
			
			 }
			 else 
			 { //怪物发射角度
				rotaion = rotaionToShoot ;
				if( this.parentTarget.roleDirection == RoleConst.ROLE_DIRECTION_RIGHT)
				{
					this.weaponNode.rotation = rotaionToShoot ;
					bullet = new NodeBullet(rotaion);
				}
				else
				{
					this.weaponNode.rotation = - rotaionToShoot ;
					bullet = new NodeBullet(-rotaion);
				}
			 }
		
		
		     bullet.source = RoleConst.RES_ROLEROOT_URL.concat("bullet2.png");

			 this.addChild(bullet);
			 if(this.weaponSectorNode != null )
			 {
				 this.weaponSectorNode.toShootBullet();
			 }
			 
			
			//  egret.setTimeout(this.shootTimeBack, this, RoleConst.SHOOT_TIME - RoleConst.TIME_100_MS);
			 //根据角度去发射
			 bullet.toShoot(this.parentTarget, roleType, rotaion, this.shootcallback);
			 
			
		 }

		 public dispos()
		 {
			 if(this.weaponSectorNode)
			 {
				this.weaponSectorNode.dispos();
			 }
			 if(this.weaponNode)
			 {
				this.weaponNode.dispos();
			 }
		
		 }

		 public shootOver(): void
		 {	
			 this.weaponNode.rotation = 0;
		
		 }
		 public shootTimeBack(): void
		 {	
			 this.weaponNode.rotation = 0;
			 this.toShootStart();
		 }

		 public shootcallback(): void
		 {	
			 	console.log("toShootCallBack@@@@@@@@@@@@@@@");
				//  this.weaponNode.rotation = 0;
		

		 }

		 public getHit()
		 {
			//  this.graphics.lineStyle(1,0xff0000);
			//  this.graphics.lineTo
		 }

		


		
			
     
    }
 }
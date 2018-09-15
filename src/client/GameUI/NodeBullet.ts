	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description  导弹
	 *
	 */
 module wqq{
    export class NodeBullet extends Node{
		
        
        public constructor(angle: number){
            super(null);
            this.name = "NodeBullet";
			this.shootAngle = angle;
			this.rotation = angle;
        }
		public initNode(): void
        {
			//    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
			this.anchorOffsetX = this.width /2;
			this.anchorOffsetY = this.height/2;
			//    this.onTouchTap();
        }
		// x轴上 shoot距离 
		private distanceX: number;
		//x轴上 短shoot距离 
		private shortDistanceX: number;
		// shoot 角度
		private shootAngle: number;

		private shooter: BaseRoleContainer;
		private targetRole :BaseRoleContainer;

		//** 射击 */
        public toShoot(shooter:BaseRoleContainer, roleType: number, angle: number, shootcallback:Function )
		{
		
		    // this.distanceX =  GameScene.getInstance().getPlayeDistanceByMonster() + 200;
			if( shooter.roleType == RoleConst.ROLE_TYPE_PLAYER)
			{
				this.targetRole = (<MapContainer>(shooter.parent)).getMonster();

			}
			else
			{
				this.targetRole = (<MapContainer>(shooter.parent)).getPlayer();
			}

		
			if( shooter.roleDirection == RoleConst.ROLE_DIRECTION_RIGHT)
			{
				 this.distanceX = MapConst.MAP_WIDTH -  shooter.x ;
			}
			else
			{
				 this.distanceX = shooter.x;
			}
			
            let self = this;
			let tween = egret.Tween.get(this, {loop: false, onChange : 
			function()
			{
					console.log("onChangeFun ");
					let pt = self.localToGlobal(self.anchorOffsetX, self.anchorOffsetY);
					let Tx = pt.x;
					let Ty = pt.y;
					if(self.targetRole.getHitTest( {Tx, Ty} ))
					{
						self.alpha = 0;
					}
			}	
			 });
			var targetX   = 0;
			var targetY  = (this.distanceX * Math.tan( (Math.PI/180) * angle));
			if( shooter.roleType == RoleConst.ROLE_TYPE_PLAYER)
			{
				targetY = targetY;
			}
			else if( shooter.roleType == RoleConst.ROLE_TYPE_MONSTER)
				{ if(shooter.roleDirection == RoleConst.ROLE_DIRECTION_RIGHT )
					{targetY = targetY;}
				else
					{targetY = -targetY;}
			
				}

			this.shootAngle =  angle  ;
			this.getHitState(roleType);

			tween.to(  {x: this.distanceX,y: targetY}, RoleConst.SHOOT_TIME).call(
					function (){
						if(this.parent != null)
						{
							this.parent.removeChild(this);
						}
						lemon.NotifyManager.sendNotification(NotifyConst.SHOOT_OVER, shooter);
						lemon.NotifyManager.sendNotification(NotifyConst.MAP_SHOOT_OVER, shooter);
						 shootcallback(shooter); }
					);
			
		
		}

	
		//** 命中 ，消息发送场景 */
		 public getHitState(roleType: number): void
		 {
			if(roleType == RoleConst.ROLE_TYPE_PLAYER )
			{
				let OriginPt = this.localToGlobal(this.x, this.y);
				let distanceX = this.distanceX;
				let shootAngle = this.shootAngle;
				let result = RoleConst.ROLE_SHOOT_ISNOT_HIT;

				lemon.NotifyManager.sendNotification(NotifyConst.SHOOT_GET_HIT, {result,OriginPt, distanceX , shootAngle });
			}
			else
			{
				let result = RoleConst.ROLE_SHOOT_IS_HIT;
				lemon.NotifyManager.sendNotification(NotifyConst.SHOOT_GET_HIT, { result});
			}
	
		 }
		 //子弹飞出去 之后回调
		private toShootCallBack()
		{
			console.log("toShootCallBack" +  this.shootAngle);
			 if(this.parent != null)
			 {
				this.parent.removeChild(this);
			 }
			console.log(this.name +" == render== "+ "["+"x:" +this.x + "y:"+ this.y +"]"+ " ["+"width:" +this.width + "height:"+ this.height +"]");
		}
		
     
    }
 }
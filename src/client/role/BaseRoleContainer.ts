/**
 *
 * @author honghong.guo
 * @date 2018.9.02
 * @description 角色基类
 *
 */
module wqq{
	   
	 export const  enum ToDirection{LEFT = 1, RIGHE = -1};//朝向
	 // ===打斗状态



	 export class BaseRoleContainer extends egret.DisplayObjectContainer{

		

	
		public bodyUrl: string;
		public weaponUrl: string;
		// 方向 左右 LEFT RIGHT
		public roleDirection:number;

		

		private gunPoint:any;
        // 身体 + 武器容器
		private bodyNode: wqq.Node;
		protected WeaponContainer: WeaponContainer;
		
		private roleWidth: number;
		private roleHeight: number;
		 // 角色ID
		private roleId: number;

		// 角色 配置表

		public roleType: number ;

		//floor
		public currentFloor: MapSprite;
		public NextFloor:MapSprite;
		//是否 boss
		protected isBoss: boolean;
		
		//人物血条
		protected roleBloodProgressBar: ProgressBar;
		//当前血量
		protected currentHp: number;
		//满血量
		protected fullHp: number;
		protected rmbNumber:number = 1;

		protected isdead: boolean;



		public constructor(id : number,isBoss?: boolean){
			super();
			this.roleId = id;
			this.isBoss = isBoss;
			this.isdead = false;
			

			this.currentHp = RoleConst.ROLE_DEFAULT_HP;//默认一滴血
			
		    this.bodyNode =  new wqq.NodeBody(this);
			this.initData();
			this.WeaponContainer = new wqq.WeaponContainer(this);
			this.addChild(this.WeaponContainer);

			this.addBloodPressBar();
			this.addRunParticle();
		
		}
		private runParticle: RunParticle;
		//**加runing 粒子  */
		protected addRunParticle(): void
		{
			this.runParticle = new RunParticle();
			this.runParticle.setXY(90,160);
			this.addChild(this.runParticle);
			this.runParticle.Visible = false;
		}
		//**加血条  */
		protected addBloodPressBar(): void
		{
			
			this.roleBloodProgressBar =new ProgressBar( );
			this.roleBloodProgressBar.width = RoleConst.ROLE_BLOOD_WIDTH;
			this.roleBloodProgressBar.height = RoleConst.ROLE_BLOOD_HEIGHT;
			this.roleBloodProgressBar.value = RoleConst.ROLE_BLOOD_MAX_VALUE;
			this.roleBloodProgressBar.anchorOffsetX = this.roleBloodProgressBar.width/2;
			this.roleBloodProgressBar.x = RoleConst.ROLE_BLOOD_OFFSET_X;
			this.roleBloodProgressBar.y = RoleConst.ROLE_BLOOD_OFFSET_Y;
			this.addChild(this.roleBloodProgressBar);
		}
		public ongTick(s: number): boolean
		{
			this.roleBloodProgressBar.value ++;
			return;

		}
	   
		protected initData()
		{
			this.initSteps();
			//ToDirection -> RIGHE
			this.roleDirection = RoleConst.ROLE_DIRECTION_RIGHT;
			// this.x = RoleConst.ROLE_OFFSET_WEAPON_X;
			// this.y = RoleConst.ROLE_OFFSET_WEAPON_Y;
			
			this.bodyNode.source = this.bodyUrl;
			this.addChild(this.bodyNode);
			this.toScaleXY();
		
		}
		private now: number = 0 ;

		private toScaleXY():void
		{
			this.scaleY = RoleConst.SCALE_Y_DOUBLE;
			this.scaleX = RoleConst.SCALE_X_DOUBLE;

		}
		private onTick(time: number)
		{	
			if(!this.now)
			{
				this.now = time;
			}
			var then:number = time;
			var pass: number = then - this.now;
			this.bodyNode.x = this.bodyNode.x  + 1;
			return false;
		}
		private EnterFrame( )
		{
			console.log(1)
		}
		public addBullet()
		{

		}

		

		public render(renderNodeName: string)
		{

			  if (renderNodeName == "NodeWeapon")
			  {
				//   var WeaponContainerA = <wqq.WeaponContainer>this.WeaponContainer;
				//   WeaponContainerA.toLayer();
			  }
			  else if (renderNodeName == "NodeBody")
			  {
				  //根据身体的宽度设置锚点
				this.anchorOffsetX = this.bodyNode.width/2;
			
			  }
		
			 
		}
		

		//角色 人物 左右 切换方向
		 public toDirection(toDir:number):void
		 {
			 if(toDir == RoleConst.ROLE_DIRECTION_LEFT)
			 {
				 this.scaleX = RoleConst.SCALE_X_TURNOVER_DOUBLE
				 this.roleDirection = RoleConst.ROLE_DIRECTION_LEFT;
			 }
			 else
			 {
				  this.scaleX = RoleConst.SCALE_X_DOUBLE;
				 this.roleDirection  = RoleConst.ROLE_DIRECTION_RIGHT;

			 }
		 }
		 public toggleDirection(): void
		 {
			 if(this.roleDirection == RoleConst.ROLE_DIRECTION_LEFT)
			 {
				 this.scaleX = RoleConst.SCALE_X_DOUBLE;
				 this.roleDirection  = RoleConst.ROLE_DIRECTION_RIGHT;
			 }
			 else
			 {
				 this.scaleX = RoleConst.SCALE_X_TURNOVER_DOUBLE
				 this.roleDirection = RoleConst.ROLE_DIRECTION_LEFT;
				 
			 }
		 }
		 //**根据玩家切换方向 */
		 public toDirectionByPlayer(roleRir: number): void
		 {
			 if(roleRir == RoleConst.ROLE_DIRECTION_LEFT)
			 {
				 this.scaleX = RoleConst.SCALE_X_DOUBLE;
				 this.roleDirection  = RoleConst.ROLE_DIRECTION_RIGHT;
			 }
			 else
			 {
				 this.scaleX = RoleConst.SCALE_X_TURNOVER_DOUBLE
				 this.roleDirection = RoleConst.ROLE_DIRECTION_LEFT;
				 
			 }
		 }
		 public touchTap(event: egret.TouchEvent): void
		 {
			//  this.toShootStop();
		  console.log(this.name + "~~touchTap");
		 }
		 
		//-- 打斗状态
		private shootState: number;

		 public set ShootState(value:number)
		 {
			 this.shootState = value;
			 this.toHandleShoot();
		 }
		 public get ShootState( ): number
		 {
			 return this.shootState;
		 }

		 // Battle
		 public toHandleShoot(): void
		 { 
			 switch (this.shootState) {
				  case RoleConst.SHOOT_START:
				   this.toShootStart();
					  break;
				  case RoleConst.SHOOT_STOP:
				  this.toShootStop();
					  break;
				  case RoleConst.SHOOT_OVER:
				  console.log("game over!");
				  
					  break;
			  
				  default:
					  break;
			  }
		 }

		 public toShootStop( ):void
		 {

			this.WeaponContainer.toShootStop();
		 }
		 
		/*怪物血掉完了吗 掉完了就死了 */
		 public get isDead():boolean
		 {
			 if(this.currentHp <= 0)
			 {
				 this.isdead = true;//死了
			
			 }
			 else
			 {
				 this.isdead = false;//没有死 了
			 }
			 return this.isdead;
			
		
		 }		 
		  /**被抢命中了 以后扩展 需要掉几滴血 */
		 public hited():void
		 {
			 this.CurrentHp = this.CurrentHp -1;
		
		 }
		 public toShootStart( ):void
		 {
			this.WeaponContainer.toShootStart();
		 }

		//**发射子弹 */
		 public toShootBullet( rotaionToShoot?: number):void
		 {
			console.log(this.name + " toShootBullet()")
			
			this.WeaponContainer.toShootBullet(this.roleType, rotaionToShoot);
	
		 }
		 
		 public getHitShootBullet(event: any ): boolean
		 {
		
			let shape = new egret.Shape();
			console.log(event);
			let o = event.OriginPt;
			let dX = event.distanceX;
			let shootAngle = event.shootAngle;

			
			shape.graphics.lineStyle(1, 0xffffff);
			shape.graphics.moveTo(o.x,o.y);
			shape.graphics.lineTo( dX, dX * Math.tan((Math.PI/180) * shootAngle) );
		
			lemon.NotifyManager.sendNotification(NotifyConst.SHOOT_GET_BODYNODE_HIT,event );

			
			return false;

		 }

		 public getHitTest(event: any ): boolean
		 {
			//  let pt = this.bodyNode.localToGlobal(event.Tx, event.Ty);
			 return this.bodyNode.hitTestPoint(event.Tx, event.Ty, true);
		 }



		 
		get RoleWidth(): number { return this.bodyNode.width; } 
		get RoleHeight(): number { return this.bodyNode.height; } 

		public dispos():void
		{
			this.WeaponContainer.dispos();
			this.bodyNode.dispos();

			if(this.parent)
			{
				this.parent.removeChild(this);

			}

		}

		protected goUpFloorSteps:Array<any>; 
        public initSteps(): void
        {
            this.goUpFloorSteps = new Array<any>();
            let steps = JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, 2).steps;
            for(var i = 0; i<MapConst.MAP_STEPS.length; i++)
            {
                
               let step =  JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, MapConst.MAP_STEPS[i]).steps;
               this.goUpFloorSteps[MapConst.MAP_STEPS[i]] = step;

            }

        }

		//设置 当前血量
		public set CurrentHp(value : number)
		{
			
			this.currentHp = value;
			this.roleBloodProgressBar.value = (this.currentHp/this.fullHp)* RoleConst.ROLE_BLOOD_MAX_VALUE;

		}
		//设置满血量
		public set FullHp(value : number)
		{
			this.currentHp = value;
			this.fullHp = value;
		}
		//获取血量
		public get CurrentHp() : number
		{
			return this.currentHp ;
		}
		//爬楼梯
		public onGoUpFloor():void
		{
			let id = this.currentFloor.ID;
			this.steps = this.goUpFloorSteps[id];
			this.onGoUpSteps();

		}
		private moveStep: number = 1;
		private steps: Array<any>;

		//爬楼梯
		private onGoUpSteps(): void
		{
			this.runParticle.Visible = true;
			let self = this;
			 var tween = egret.Tween.get(this, {loop:false, onChange : function(){   } });
			  var targetX: number ;
			 if(this.roleDirection == RoleConst.ROLE_DIRECTION_RIGHT)
			 {
				targetX =  this.steps[this.moveStep].x;
			 }
			 else
			 {
				 targetX =MapConst.MAP_WIDTH -   this.steps[this.moveStep].x;

			 }
			 var targetRotation: number ;
			 if(this.roleDirection == RoleConst.ROLE_DIRECTION_RIGHT)
			 {
				 targetRotation =  5;
			 }
			 else
			 {
				 targetRotation =  -5;
			 }

			//    egret.Tween.get(this.runParticle, {loop:false}).to( {rotation: targetRotation, x: targetX, y:this.y - this.steps[this.moveStep].y}, MapConst.MAP_ROLE_STEP_TIME ,egret.Ease.backOut).wait( MapConst.MAP_ROLE_STEP_WAIT_TIME );
			  tween.to( {rotation: targetRotation, x: targetX, y:this.y - this.steps[this.moveStep].y}, MapConst.MAP_ROLE_STEP_TIME ,egret.Ease.backOut).wait( MapConst.MAP_ROLE_STEP_WAIT_TIME ).call(
				  function()
				  {
					  this.nextGoUpFloor();
				  }
			  )

		}
		//继续爬楼梯
		private nextGoUpFloor():void
		{
			this.moveStep++;
		
			if(this.moveStep == this.steps.length  )
			{
				egret.Tween.removeTweens(this);
				this.moveStep = 0;
				this.toggleDirection();
					this.rotation = 0 ;
					this.runParticle.Visible = false;
				if(this.roleType ==  RoleConst.ROLE_TYPE_PLAYER)
				{
			

					lemon.NotifyManager.sendNotification(NotifyConst.GO_UP_FLOOR_OVER);

				}
				
				
			}
			else
			{
				this.onGoUpSteps();
			}	

		}

		
      

		 





	}
}
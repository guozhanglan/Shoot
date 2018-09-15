	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 地图容器
	 *
	 */
 module wqq{

    export class MapContainer extends egret.DisplayObjectContainer{
        private mapNode:MapSprite;
        //地图背景文理 填充
        private mapBgTexture: MapBitmap;

        //地图片 缓冲池 
        private mapPool: ObjectPool;
        private playerSprite: Player;//玩家
		private monsterSprite: Monster;//怪物发射

        public constructor(){
            
            super();
            this.name = "MapContainer";
            this.touchEnable(false);

            this.mapPool = new ObjectPool();
            this.mapSpriteArray = new Array<MapSprite >();
            this.initSteps();
            this.addMapBgTexture();
            this.initMapNodes();
            this.addRoles();
            this.addNotifyMessage();
        }
        /**加图层蒙版 */
      
        private touchEnable(value: boolean): void
        {
            this.touchChildren = value;
            this.touchEnabled = value;

        }
        public addNotifyMessage(): void
        {
            lemon.NotifyManager.registerNotify(NotifyConst.MAP_SHOOT_OVER, this.onShootOver, this);
            lemon.NotifyManager.registerNotify(NotifyConst.GO_UP_FLOOR_OVER, this.goUpfloorOver, this);
            lemon.NotifyManager.registerNotify(NotifyConst.SHOOT_GET_HIT,this.getHitShootBullet,this );
            lemon.NotifyManager.registerNotify(NotifyConst.GAME_START, this.gameStart, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this , false );
        }
        //**游戏开始 */
        public gameStart(): void
        {
            this.touchEnable(true);
            this.playerSprite.ShootState = RoleConst.SHOOT_START;

        }
        //**添加 人 和怪物 */
        public addRoles(): void
        {
            this.playerSprite = new Player(RoleConst.ROLE_PLAYER_ID);
            this.addChildAt(this.playerSprite,RoleConst.ROLE_LEVEL);
            let s  = this.mapSpriteListID[1];
            this.playerSprite.x = this.goUpFloorStepsArray[s][0].x;
            //当前楼梯
            this.playerSprite.currentFloor  = this.mapSpriteArray[0];
            this.playerSprite.y = -  this.playerSprite.currentFloor.MapHeight - MapConst.MAP_TO_ROLE_SPACE - MapConst.MAP_SPRITEBG_HEIGHT;
            this.playerSprite.ShootState = RoleConst.SHOOT_START;
            this.addMonsterSprite();
        }
      
        public addMonsterSprite():void
        {
            // this.removeMonsterSprite();
            
            //**Boss 怪 */
            let isBoss: boolean = false;
            let data = GameScene.getInstance().getMonsterData();
            if(data != undefined )
            {
                if(1 == data.getConfData("type"))
                {
                    isBoss = true;
                  
                }
            
           
            }
         
            console.log("isBoss"+ isBoss);
            this.monsterSprite = new Monster(RoleConst.ROLE_MONSTER_ID, isBoss);
            if(undefined != data)
            {
                 this.monsterSprite.setMonsterData(data);
            }
                
                  
        

            this.addChildAt(this.monsterSprite,RoleConst.ROLE_LEVEL);
             //**Boss 怪 */
  

           
            let tempNextMapSprite = this.getNextFloor();
            this.monsterSprite.currentFloor = this.getNextFloor();
            this.monsterSprite.y =  this.playerSprite.y -   this.playerSprite.currentFloor.FloorHeight + MapConst.MAP_SPRITE_HEIGHT;
            this.monsterSprite.x = MapConst.MAP_WIDTH -    this.playerSprite.x;
            // let targetX = MapConst.MAP_WIDTH -    this.playerSprite.x;
            this.monsterSprite.toDirectionByPlayer(this.playerSprite.roleDirection )
            this.monsterSprite.ShootState = RoleConst.SHOOT_STOP;
            // egret.Tween.get(this.monsterSprite,{loop: false } ,this).to({ x:  targetX}, 1000);


        }
      



        
        


        //**添加地图背景文理 */
        public addMapBgTexture(): void
        {
            
            this.mapBgTexture = new MapBitmap();
            this.mapBgTexture.visible = false;
            this.addChildAt(this.mapBgTexture ,0 );
        
            this.mapBgTexture.source = MapConst.RES_MAPROOT_URL.concat("bg.png" ); 
        }
       //** 初始化 加载地图  初始化人物坐标 */
        public initMapNodes(): void
        {
           
              let i = 1; 
              let len = this.mapSpriteListID.length;
              for(i = 0; i< len; i++)
              {
                        var mapNode:MapSprite = this.mapPool.pop("wqq.MapSprite",  this.mapSpriteListID[i], this);
                        this.addChildAt(mapNode, 1);

                        this.allMapSpriteHight =  this.allMapSpriteHight +  mapNode.MapHeight; 
                        mapNode.y = - this.allMapSpriteHight; 
                        this.toChangeTurnOver(mapNode);

                       this.mapSpriteArray.push(mapNode);
                    
              }
       

        }
        //*计算 地图台阶的高度
        private allMapSpriteHight: number = MapConst.MAP_SPRITEBG_HEIGHT;

        //地图片随机id
        private mapSpriteListID: Array<number> = [2,2,5,4,2];
        private mapSpriteArray:Array<MapSprite>;
 
        // 初始化角色

		private ontick(stamp: number): boolean
		{
		
			return true;
		}
    

     
        //**排版 complete*/
        public toLayer(mapSprite: MapSprite): void
        {
          
            if(mapSprite == null)
            {
                this.mapBgTexture.fillMode = egret.BitmapFillMode.REPEAT;
                this.mapBgTexture.height = MapConst.MAP_HEIGHT;
                this.mapBgTexture.width = MapConst.MAP_WIDTH;   
                this.mapBgTexture.y =  - MapConst.MAP_HEIGHT;
            }
            else
            {
           
            }
        }
	
        public onTouchTap(event : Event): void
        {
         
            this.touchEnable(false);
            this.playerSprite.toShootBullet( );
        }

        private currentmonsterData: MonsterData;


         // 计算 是否命中
         private result_hit: number;
		 public getHitShootBullet(event: any ): void
		 {
			 this.result_hit = event.result;
			 if(RoleConst.ROLE_SHOOT_IS_HIT == this.result_hit)
			 {
				  console.log("怪物发射 ->命中 ->玩家");	
			 }
			 else if(RoleConst.ROLE_SHOOT_ISNOT_HIT == this.result_hit)
			 {
                
                    let o = event.OriginPt;
                    let dX = event.distanceX;
                    let shootAngle = event.shootAngle;

                    let Tx;
                    let Ty;

                      for(let i = 1 ; i < dX  ; i++ )
                        {
                            if(this.playerSprite.roleDirection == RoleConst.ROLE_DIRECTION_RIGHT)
                            {
                                  Tx = o.x + i;
                            }
                            else
                            {
                                  Tx = o.x - i;
                            }
                          
                            Ty =  o.y - ( i * Math.tan((Math.PI/180) * Math.abs(shootAngle)) );
                            if( true ==	this.monsterSprite.getHitTest({Tx, Ty} ) )
                            {
                                    console.log(" 玩家 ->命中 -> 怪物 ");	
                                    this.result_hit = RoleConst.ROLE_SHOOT_IS_HIT;
                                    this.monsterSprite.hited();
                                    if(true == this.monsterSprite.isDead)
                                    {
                                        lemon.NotifyManager.sendNotification(NotifyConst.GAME_PLAYER_SHOOT_HIT);
                                    }
                                    break;
                            }
                        }
                  
                    if(RoleConst.ROLE_SHOOT_ISNOT_HIT == this.result_hit  )
                    {  
                         console.log(" 玩家 ->没有命中 -> 怪物 ");	
                    }
			 }
		 }
     
         /**
		 * @description shoot完成之后 回调
		 */
         public onShootOver(shooter:BaseRoleContainer ): void
         {
            //  发射的玩家
                console.log(shooter.name  +"onShootOver");
            if (egret.is(shooter , "wqq.Player"))
            {
                if(this.result_hit == RoleConst.ROLE_SHOOT_IS_HIT )
                {   //命中之后 
                     this.goNext();
                }
                else
                {
                    this.monsterSprite.toShootBullet(this.getRotationToShoot());
                }
            }
            else
            {
                this.playerSprite.hited();
                if(this.playerSprite.isDead )
                { 
                      this.removeRoleSprite(this.playerSprite); 
                }
              

            }

         }

       //**移除了 之后回调 **
        public removePlayerSpriteCallBack(): void
        {
   
            lemon.NotifyManager.sendNotification(NotifyConst.GAME_OVER);
        }
        public removeMonsterSpriteCallBack(): void
        {
            if(this.monsterSprite && this.monsterSprite.parent )
            {
                this.parent.removeChild(this.monsterSprite);

            }
   
         
        }
         //被杀死了 就可以移除了
        public removeRoleSprite( role: any): void
        {
          
            if(role.roleType == RoleConst.ROLE_TYPE_MONSTER)
            {
                  this.monsterSprite.anchorOffsetY = RoleConst.ROLE_BODY_HEIGHT;
                  TweenEffectUtil.rotationOutDown(this.monsterSprite, this.removeMonsterSpriteCallBack);
            }
            else
            {
                  this.playerSprite.anchorOffsetY = RoleConst.ROLE_BODY_HEIGHT;
                  TweenEffectUtil.rotationOutDown(this.playerSprite, this.removePlayerSpriteCallBack);
            }
            
        }
        
         //**Monster 固定发射角度 */
		 public getRotationToShoot():number
		 {
			 let ration;
			 let dx = this.monsterSprite.x - (this.playerSprite.x );
			 let dy = this.monsterSprite.y - (this.playerSprite.y);
			 ration = Math.atan(dy/dx)*(180/Math.PI);
			 return ration;

		 }

         
    
         //**命中之后 继续，->爬楼梯->滚地图 */
            public goNext(): void
            {
            
                this.goUpFloorCounts++;

                if(true == this.monsterSprite.isDead)
                {
                    this.removeRoleSprite(this.monsterSprite);
                    this.startGoUpFloor();
                }
                else
                {
                     this.monsterSprite.onGoUpFloor();
                     this.startGoUpFloor();
                }
                

            }    
         //**爬楼梯数目 */
        private goUpFloorCounts: number = 0;

       //**爬楼梯 */
        public startGoUpFloor(): void
        {
            
            this.playerSprite.onGoUpFloor();
            this.setCurrentFloor();
        }
        /**爬完楼梯 设置当前的台阶 */
        private setCurrentFloor():void
        {
            let index = this.mapSpriteArray.indexOf(this.playerSprite.currentFloor);
            this.playerSprite.currentFloor = this.mapSpriteArray[index +1];
        }
        private getNextFloor():MapSprite
        {
            let index = this.mapSpriteArray.indexOf(this.playerSprite.currentFloor);
            let nextFloor = this.mapSpriteArray[index +1];
            return nextFloor;
        }
        
        //**爬完楼梯结束之后 滚地图*/
        private goUpfloorOver(): void
        {
            if(true == this.monsterSprite.isDead)
            {
                this.addMonsterSprite();
            }
            
            let tempMapSprite = this.mapSpriteArray[0];
            this.goUpMapHeight = tempMapSprite.FloorHeight - MapConst.MAP_SPRITE_HEIGHT ;
            if(1 != this.goUpFloorCounts) //第一次不滚地图片
            {
                 let tween = egret.Tween.get(this, {loop:false});
                tween.to({ y: this.y + this.goUpMapHeight }, MapConst.MAP_UP_TIME).call(this.goUpMapCallBack );

            }
            else
            {
                let tween = egret.Tween.get(this, {loop:false});
                tween.to({ y: this.y + MapConst.MAP_SPRITE_HEIGHT }, MapConst.MAP_UP_TIME).call(this.goUpMapCallBack );
                // this.goUpMapCallBack();
            }
        }

        private goUpMapHeight: number = 0;//滚地图 高度
        private goUpMapCallBack(): void
        {
             
             this.playerSprite.toShootStart();
             this.touchEnable(true);
             this.swapFloor();
        }
      
        //**交换地图片 *下面的移除 ->滚上面去 地图总数不变*/
        public swapFloor(): void
        {
            let tempMapSprite = this.mapSpriteArray[0];
            tempMapSprite.visible = false;
         
            this.removeChild(tempMapSprite);
            this.addChildAt(tempMapSprite, 1);
            tempMapSprite.y = -this.allMapSpriteHight - tempMapSprite.MapHeight;
            tempMapSprite.visible = true;
            this.allMapSpriteHight = this.allMapSpriteHight + tempMapSprite.MapHeight;
            this.toChangeTurnOver(tempMapSprite);

            this.mapSpriteArray.shift();//删除数组的第一个 元素
            this.mapSpriteArray.push(tempMapSprite);
        }

   

        //阶梯左右 切换 左右翻转
        public toChangeTurnOver(tempMapSprite: MapSprite)
        {
            if(this.mapSpriteArray.length > 0)
                {
                    if(true == this.mapSpriteArray[this.mapSpriteArray.length -1].ISTurnOver)
                    {
                        tempMapSprite.toTurnRight();
                    }
                    else
                    {
                        tempMapSprite.toTurnOver();
                    }
                }
        }

       

       //**上阶梯 获取配置坐标点  */
        private goUpFloorStepsArray:Array<any>; 
        public initSteps(): void
        {
            this.goUpFloorStepsArray = new Array<any>();
            let steps = JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, 2).steps;
            for(var i = 0; i<MapConst.MAP_STEPS.length; i++)
            {
                
               let step =  JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, MapConst.MAP_STEPS[i]).steps;
               this.goUpFloorStepsArray[MapConst.MAP_STEPS[i]] = step;

            }
        }

        public getMonster(): Monster
        {
            
            return this.monsterSprite;    
        }
        public getPlayer(): Player
        {
            
            return this.playerSprite;    
        }
        public dipose(): void
        {
            
        }

        private addMask(): void
        {
            let maskShap: egret.Shape ;
            maskShap = new egret.Shape();
            maskShap.graphics.beginFill( 0xf00000,0.1);
            maskShap.graphics.drawRect(this.x,this.y,this.width, this.height );
            maskShap.graphics.endFill();
            maskShap.alpha = 0.1;
            this.addChildAt(maskShap, 10000);
			this.mask = maskShap;
        }


        
     }
}
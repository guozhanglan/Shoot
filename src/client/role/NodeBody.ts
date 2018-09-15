	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 角色基类
	 *
	 */
 module wqq{
    export class NodeBody extends Node{
        
        public constructor(parentTarget: wqq.BaseRoleContainer){
            super(parentTarget);
            this.name = "NodeBody";
        }
		public initNode(): void
        {
           
	

            this.anchorOffsetX = this.width/2;
            this.anchorOffsetY = this.height;
            this.x =    this.width/2;
            this.y =   this.height ;

            		// egret.setTimeout(this.toTween, this, 2000);
            lemon.NotifyManager.registerNotify(NotifyConst.SHOOT_GET_BODYNODE_HIT, this.getHitBodyNodeTest,this)
            
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

        }

        private toTween()
		{
            // this.anchorOffsetX = 55;
            // this.anchorOffsetY = 55;
         
			var tween = egret.Tween.get(this, {loop: true});
			tween.to({ rotation : -45}, 1000);
		}
        private onTouchTap()
		{
            // this.anchorOffsetX = 55;
            // this.anchorOffsetY = 55;
         
			var tween = egret.Tween.get(this, {loop: true});
			tween.to({ rotation : -45}, 1000);
		}
        //test 检测被击中的 回调函数
         public getHitBodyNodeTest(event: any ):boolean
		 {

       
			let o = event.OriginPt;
			let dX = event.distanceX;
			let shootAngle = event.shootAngle;

            let shape = new egret.Shape();
			shape.graphics.lineStyle(1, 0xffffff);
			shape.graphics.moveTo(o.x +   RoleConst.ROLE_OFFSET_WEAPON_X ,o.y +  RoleConst.ROLE_OFFSET_WEAPON_X);
			shape.graphics.lineTo( dX, dX * Math.tan((Math.PI/180) * shootAngle) );
		
         
             if( egret.is(this.parent, "wqq.Player") )
             {
                 this.parent.addChild(shape);
                let Tx;
                let Ty;
                console.log(this.name +" == render== "+ "["+"x:" +this.x + "y:"+ this.y +"]"+ " ["+"width:" +this.width + "height:"+ this.height +"]");
                for(let i = 1 ; i < dX  ; i++ )
                {
                    Tx = o.x + i;
                    Ty = o.y - ( i * Math.tan((Math.PI/180) * shootAngle) );
            

                    if( true ==this.hitTestPoint(Tx,Ty) )
                    {
                            console.log("命中");	break;
                    }

                }


             }

            
             return true;

         }


      

		
     
    }
 }
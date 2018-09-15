	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description  导弹
	 *
	 */
 module wqq{
    export class RmbBitMap extends egret.Bitmap{

        private url: string;
		
        
        public constructor(url: string){
            super();
            this.url  = url;
            this.initBitMap();
          
        }

        public initBitMap(): void
        {
            
       
			this.texture = RES.getRes(this.url);
            this.y = RoleConst.ROLE_BODY_HEIGHT/2 + 20;
			this.x = RoleConst.ROLE_BODY_WIDTH/2 ;
			this.scaleX = 0.5
			this.scaleY = 0.5
        }
		

        public flyOut(): void
        {
            lemon.TweenEffectUtil.fly(this, 100,  23,  false,1, this.onCallback);

        }

         private onCallback(): void
		 {
			console.log("df onCallback  ##### ");
			if(this && this.parent)
			{
				this.parent.removeChild(this);
			}


		 }
	
    }
 }
	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 角色基类
	 *
	 */
 module wqq{

    export class MapBitmap extends egret.Bitmap{
	
        public constructor(){
			
            super();
		
        }

		public url:string ;
        public set source( url: string)
        {
            this.url = url;

            this.startLoad();
        }
    
        public startLoad(){
            var loader:egret.ImageLoader = new egret.ImageLoader();
            loader.addEventListener(egret.Event.COMPLETE, this.onLoaderComplete, this);
            loader.load(this.url);
        }
        // resource onLoaderComplete guohonghong
        private onLoaderComplete(event: egret.Event)
        {
            let loader = <egret.ImageLoader>event.target;
            var bitmapData:egret.BitmapData = loader.data;
            var texture  = new egret.Texture();
            texture.bitmapData = bitmapData;
			this.$setTexture( texture);
			// this.anchorOffsetX =  this.width/2;
            // this.x = this.width/2;
            // this.scaleX = -1;
           
			// return new egret.Bitmap(texture);
            this.height = bitmapData.height;
        
			this.onLoaderCompleteOver();
        
        }
        //**翻转 */
        public toTurnOver()
        {
            this.anchorOffsetX = MapConst.MAP_WIDTH/2;
            this.x = MapConst.MAP_WIDTH/2;
            this.scaleX = -1;

        }
        public toTurnRight()
        {
            this.anchorOffsetX = MapConst.MAP_WIDTH/2;
            this.x = MapConst.MAP_WIDTH/2;
            this.scaleX = 1;

        }

		 public onLoaderCompleteOver()
        {
			// let mapSprite= <MapSprite>this.parentTarget;
			// mapSprite.loadedOver();
			// return new egret.Bitmap(texture);
            
            if(egret.is(this.parent, "wqq.MapContainer"))
            {
                (<MapContainer>this.parent).toLayer(null);
            }
            else if(egret.is(this.parent, "wqq.MapSprite") )
            {
                (<MapSprite>this.parent).toLayer(this);
                // let mapSprite = this;
                // lemon.NotifyManager.sendNotification(NotifyConst.MAP_LOAD, {mapSprite });
                
            }
            else if(egret.is(this.parent, "wqq.GameScene") )
            {
                (<GameScene>this.parent).toLayer();
          
                
            }

        
        }


    }
 }
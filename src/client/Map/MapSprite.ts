	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 地图容器
	 *
	 */
 module wqq{

    export class MapSprite extends egret.Sprite{
 
        //8是否翻转
        private IsTurnOver;
        private id;

        private url: string;
        private pTarget:egret.DisplayObjectContainer;

        private mapHeight: number ;

        

        public constructor(id: number, pTarget: egret.DisplayObjectContainer){
            super(); 
            this.pTarget = pTarget;
            //默认 不翻转
            this.id = id;
            this.IsTurnOver = false ;
            this.mapHeight =  (JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, this.id)).height;
            this.initMapNode();
        }
       
        private mBitmapfloor: MapBitmap;
        private mBitmapBg:MapBitmap;

        public initMapNode()
        {
            this.mBitmapBg = new MapBitmap();   
            // this.mBitmapBg.visible = false;
            this.addChild(this.mBitmapBg);
            //  this.url =    (JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, this.id)).mapUrl;
            this.mBitmapBg.source = MapConst.RES_MAPROOT_URL.concat( "f0.png" );
            this.mBitmapBg.y = (JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, this.id)).height;
      
            
                this.mBitmapfloor = new MapBitmap();   
            this.addChild(this.mBitmapfloor);
            this.url =    (JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, this.id)).mapUrl;
            this.mBitmapfloor.source = MapConst.RES_MAPROOT_URL.concat(  this.url);


        }

        public toTurnOver(): void
        {
            this.IsTurnOver = true;

            this.mBitmapfloor.toTurnOver();
            this.mBitmapBg.toTurnOver();
        }
        public toTurnRight(): void
        {
            this.IsTurnOver = false;

            this.mBitmapfloor.toTurnRight();
            this.mBitmapBg.toTurnRight();
        }

        //** 排版 */
        public toLayer(mBitMap: MapBitmap): void
        {
            if(mBitMap.url ==  MapConst.RES_MAPROOT_URL.concat(  this.url))
            {
                //   (<MapContainer> this.pTarget).toLayer(this);
            }

        }
        public get ID(): number
        {
            return this.id;
            
        }
        public get ISTurnOver(): boolean
        {
            return  this.IsTurnOver;
            
        }
        public get MapHeight(): number
        {
            return   (JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, this.id)).height  - MapConst.MAP_SPRITE_HEIGHT;
            
        }
        public get FloorHeight(): number
        {
            return   (JsonDataManager.getInstance().getConf(JsonDataName.CFG_MAP, this.id)).height ;
            
        }


        
     }
}
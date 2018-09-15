	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 角色基类
	 *
	 */
 module wqq{
    export class Node extends egret.Sprite{
        protected parentTarget: BaseRoleContainer;

        
        public constructor(parentTarget: wqq.BaseRoleContainer){
            super();
            this.parentTarget = parentTarget;
            
            // this.addAllEvents();
        }
        private url:string ;
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

        private onLoaderComplete(event: egret.Event)
        {
            let loader = <egret.ImageLoader>event.target;
            var bitmapData:egret.BitmapData = loader.data;
            var texture  = new egret.Texture();
            texture.bitmapData = bitmapData;
          
            // 加载 完成之后
            this.addChild(new egret.Bitmap(texture));
          
            this.initNode();
            if(null !=  this.parentTarget )
            {
                  this.parentTarget.render(this.name);

            }
        }
    
       
        public  initData()
         {
          console.log("initData() overriding");
                
        }

        public initNode(): void
        {

        }

        public dispos()
        {

            this.removeChildren();
        }


    }
 }
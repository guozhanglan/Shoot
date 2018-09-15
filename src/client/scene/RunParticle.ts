module wqq{
    export class RunParticle extends egret.DisplayObjectContainer{
        private system : particle.ParticleSystem;

        private runBitmap: egret.Bitmap;
    
        public constructor()
        {
            super();

            this.initData();
            //缩小了
          
        }
        public initData(): void
        {
            let configJson = RES.getRes("particle_paoqilaiw_json" );
            let texture = RES.getRes("particle_paoqilai_png" )
            
            this.system = new particle.GravityParticleSystem(texture, configJson );
            this.system.start();
            this.addChild(this.system);

            this.runBitmap = new egret.Bitmap();
            this.runBitmap.texture = RES.getRes("role_run_png");
            this.addChild(this.runBitmap);
            this.runBitmap.scaleX =  this.runBitmap.scaleY = 0.5;
            this.runBitmap.anchorOffsetX =  70;
            this.runBitmap.anchorOffsetY =  35;

         


        }
        public onTick(s: number): boolean
        {
            this.runBitmap.rotation ++;
            return true;
        }
        public set Visible(value: boolean)
        {
            this.visible = value;
            if(true == this.visible )
            {
                egret.Tween.get( this.runBitmap, {loop: true}).to( {rotation : 360}, 300);
            }
            else
            {
                egret.Tween.removeTweens(this.runBitmap);
            }


        }

        public setXY(x:number, y: number): void
        {
            this.system.emitterX = x;
            this.system.emitterY = y;
            this.runBitmap.x  = x ;
            this.runBitmap.y  = y ;
        }

    }
}
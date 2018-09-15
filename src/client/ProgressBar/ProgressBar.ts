
module wqq{

    export class ProgressBar extends eui.ProgressBar
    {
        constructor( )
        {
            super();
            //center
            this.initProgressBar();
            

        }
        public initProgressBar()
        {
            this.anchorOffsetX = this.width/2;
            this.value = 0;
            
            this.scaleX = 1/RoleConst.SCALE_Y_DOUBLE;
            this.scaleY = 1/RoleConst.SCALE_Y_DOUBLE;
        
        }
        public setingSkin(skinName : string):void
        {
            this.skinName = skinName;

        }


        
    }
}
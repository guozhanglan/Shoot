	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 角色基类
	 *
	 */
 module wqq{


		
		
    export class NodeWeapon extends Node{
	
		private toDirection: number;

		private toRotateAngle : number;

        public constructor(parentTarget: wqq.BaseRoleContainer){
            super(parentTarget);
			 this.name = "NodeWeapon";
        }

	    public initNode(): void
        {
		
			this.anchorOffsetX = this.width/2;
			this.anchorOffsetY = this.height/2;
		
        }

	
		public ToRadation()
		{
			console.log("djkd");
		
		}
	
		private onChangeCallBack()
		{
			// this.rotation = 0;
	
			// console.log("change" );
			
			
		}
		
		private weaponTween()
		{
			var tween = egret.Tween.get(this, {loop: true, onChange : this.onChangeCallBack});
			tween.to({ rotation : -45,loop : true}, 1000);
		}

		  public toShootStop( ):void
		 { 
		   this.rotation = 0 ;
		 }
	     public toShootStart( ):void
		 {
			 this.rotation = 0 ;
		 }
		 
         public dispos()
         {

            super.dispos();
			
         }

		
			
     
    }
 }
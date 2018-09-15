module wqq{
	   
	 export class Player extends BaseRoleContainer{

         	public constructor(id : number){
			super(id);
			this.name = "Player";
			
		}

		protected initData()
		{
			this.roleType =  RoleConst.ROLE_TYPE_PLAYER;
			this.bodyUrl = 	 RoleConst.RES_ROLEROOT_URL.concat(RoleConst.RES_ROLE_URL, "1", RoleConst.RES_PNG);
			this.weaponUrl =  RoleConst.RES_ROLEROOT_URL.concat(RoleConst.RES_WEAPON_URL, "1", RoleConst.RES_PNG);
			super.initData();
		
		}
		protected addBloodPressBar(): void
		{
			super.addBloodPressBar();
			this.roleBloodProgressBar.setingSkin (RoleConst.ROLE_BLOOD_PLAY_SKIN );
			
		}
	 


	
     }
 }
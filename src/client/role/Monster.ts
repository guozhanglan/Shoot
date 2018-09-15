module wqq{
	   
	 export class Monster extends BaseRoleContainer{

		   private rmb: RmbBitMap;

		   private monsterData:MonsterData;
         	public constructor(id : number, isBoss: boolean){
			super(id,isBoss);
		
			this.name = "Monster";
			// this.weaponNode =  new wqq.NodeWeapon(this);
		}
			//**加血条  */
		protected addBloodPressBar(): void
		{
			super.addBloodPressBar();
			this.roleBloodProgressBar.setingSkin (RoleConst.ROLE_BLOOD_MONSTER_SKIN );

			if(this.isBoss )
			{
				this.roleBloodProgressBar.visible = false;
			}
			else
			{
				this.roleBloodProgressBar.visible = true;
			}

		
		}

		public setMonsterData( data: MonsterData ): void
		{
			this.monsterData = data;
			this.rmbNumber = this.monsterData.getConfData("gold");
			this.FullHp = this.monsterData.getConfData("hp");

			
		}
		private timeKey: number ;
		
		private rmbArray: Array<RmbBitMap> = []; 
		
		private addRmb():void
		{

			for(let i = 0; i< this.rmbNumber; i++)
			{
				let rmb:RmbBitMap = new RmbBitMap( "common_res_json.jinbi");
				this.addChild(rmb);
				this.x = this.x + i * 100 ;
				this.rmbArray.push(rmb);
			}

			for(let i = 0; i< this.rmbArray.length; i++)
			{
				this.rmbArray[i].flyOut();
				this.rmbArray.pop();
			
			}

		}
		 private onTimerGo()
		 {
		

		 }

		protected initData()
		{
			this.roleType =  RoleConst.ROLE_TYPE_MONSTER;
			let rand: number;
			if(true == this.isBoss )
			{
				rand =Math.floor((Math.random()*(RoleConst.ROLE_BOSS_MAX_ID -RoleConst.ROLE_BOSS_MIN_ID))) + RoleConst.ROLE_BOSS_MIN_ID;
				this.bodyUrl = 	 RoleConst.RES_ROLEROOT_URL.concat("boss_",RoleConst.RES_MONSTER_URL, rand.toString(), RoleConst.RES_PNG);
			}
			else
			{
				rand =Math.floor((Math.random()*(RoleConst.ROLE_MONSTER_MAX_ID -RoleConst.ROLE_MONSTER_MIN_ID))) + RoleConst.ROLE_MONSTER_MIN_ID;
				this.bodyUrl = 	 RoleConst.RES_ROLEROOT_URL.concat(RoleConst.RES_MONSTER_URL, rand.toString(), RoleConst.RES_PNG);
			}
			
			
			this.weaponUrl =  RoleConst.RES_ROLEROOT_URL.concat(RoleConst.RES_WEAPON_URL, "1", RoleConst.RES_PNG);

			lemon.NotifyManager.registerNotify(NotifyConst.SHOW_RMB,this.addRmb, this);
			super.initData();
		
		}
		

		 public dispos():void
		 {
			super.dispos();
		
		 }
	
		 /**被抢命中了 以后扩展 需要掉几滴血 */
		 public hited():void
		 {
			 this.CurrentHp = this.CurrentHp -1;
		
		 }
		
     }
 }
module wqq {
	export class AIConfigInfo extends BaseData {
		public SkinIDs:Array<number> = [];
		public AHeadDist:number;
		public AvoidRadius:number;
		public Agressive:number;
		public Agile:number;
		public FindBeanDist:number;
		public DesperateFactor:number;
		public EatBeanFactor:number;
		public MinThinkInterval:number;
		public MaxThinkInterval:number;
		public MinWanderInterval:number;
		public MaxWanderInterval:number;

		public constructor(confId:number,conf:any) {
			super(confId, conf);
			let attrs:Array<string> = conf.split(",");
			let str:string = attrs[0];
			let skins = str.split("|");
			for(let i = 0 ; i < skins.length; i++){
				this.SkinIDs.push(parseInt(skins[i]));
			}
			this.AHeadDist = parseFloat(attrs[1]);
			this.AvoidRadius = parseFloat(attrs[2]);
			this.Agressive = parseFloat(attrs[3]);
			this.Agile = parseFloat(attrs[4]);
			this.FindBeanDist = parseFloat(attrs[5]);
			this.DesperateFactor = parseFloat(attrs[6]);
			this.EatBeanFactor = parseFloat(attrs[7]);
			this.MinThinkInterval = parseFloat(attrs[8]);
			this.MaxThinkInterval = parseFloat(attrs[9]);
			this.MinWanderInterval = parseFloat(attrs[10]);
			this.MaxWanderInterval = parseFloat(attrs[11]);
		}
	}
	export class SkinInfo extends BaseData {
		public name:string;
		public touPath:string;
		public tailPath:string;
		public bodyPath:string;

		public constructor(confId:number,conf:any) {
			super(confId, conf);
			let attrs:Array<string> = conf.split(",");
			this.name = attrs[0];
			this.touPath = attrs[1];
			this.tailPath = attrs[2];
			this.bodyPath = attrs[3];			
		}
	}
	export class LocalResources {
		private static m_Instance:LocalResources = null;
		public static getInstance():LocalResources
		{
			if (LocalResources.m_Instance == null) {
				LocalResources.m_Instance = new LocalResources();
			}
			return LocalResources.m_Instance;
		}
	
		private m_Skins:Array<SkinInfo> = [];

		private m_MonsterDatas:Array<MonsterData> = [];
		private m_MonstersByPass: Object= {};
		public constructor() {
		}

		public initCfg(){
		
			this.initSkinData();
			this.initMonsterData();

		}

		public initMonsterData(){
			let monsterCfg = JsonDataManager.getInstance().getJSONData(JsonDataName.CFG_MONSTER);
			if (monsterCfg){
				for (let i in monsterCfg){
					let item = monsterCfg[i];
					this.m_MonsterDatas.push(new MonsterData(item.ID, item));
					//---键值对 存储数据 {关卡id =>[item, item, item]}
					if(this.m_MonstersByPass[item.gid] == null)
					{
						this.m_MonstersByPass[item.gid] = [];
					}
					this.m_MonstersByPass[item.gid].push(item);
				}
			}
		}


		public initSkinData(){
			let skinsConf = JsonDataManager.getInstance().getJSONData(JsonDataName.CFG_SKINS);
			if (skinsConf){
				for(let i in skinsConf.items){
					let item = skinsConf.items[i];
					this.m_Skins.push(new SkinInfo(item.id, item.data));
				}
			}
		}

	
		public getMonsterData():Array<MonsterData>{
			return this.m_MonsterDatas;
		}
		public getMonsterDataByPass(): Object{
			return this.m_MonstersByPass;
		}
		
		
	}
}
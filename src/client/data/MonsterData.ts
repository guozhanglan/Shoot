module wqq
{
    export class MonsterData extends BaseData
    {
        private _monster: any;
        public constructor(confId: number, conf: any)
        {
            super(confId, conf);
      
        
        }
        public get res(): string
        {
            return this.getConfData("name");
        }
  
    }
}
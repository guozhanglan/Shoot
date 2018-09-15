	/**
	 *
	 * @author honghong.guo
	 * @date 2018.9.02
	 * @description 角色基类
	 *
	 */
    module wqq{
		export enum RoleType{
			MONSTER,
			PLAYER
		}
        export class BaseRole{
			enum 
            public constructor(){
            }
			private id: number;
			private name: string;
			private roleType: RoleType;

			private BaseRoleContainer: egret.Sprite;

			
		


        }
    }
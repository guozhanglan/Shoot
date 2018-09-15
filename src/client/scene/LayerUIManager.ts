module wqq{
    export class LayerUIManager 
    {
        public constructor()
        {
        }

        public static openLayer(objectAppString: string , ...args): any
        {
             
            var cls = egret.getDefinitionByName(objectAppString);
            var layer = new cls();
            layer.openModule(true, null, LayerConst.UI_LAYER);
            return layer;
        }

    }
}
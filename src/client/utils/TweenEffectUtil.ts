module wqq
{
    export class TweenEffectUtil
    {
        public static monsterGoOut():void
        {

        }

          /**
         * 滚一圈 慢速出场
         * @param object 要做效果的对象
         * @param delay  延迟播放的时间
         * @param total  动画总时间
         * @param easeFunName 缓动方程
         * @param isLoop 是否循环
         */
        public static rotationOutDown(object:egret.DisplayObject, onCallBack: Function,delay:number = 0,total:number = 0,easeFunName:string = "",isLoop:boolean = false):void{
            egret.Tween.removeTweens(object);
            var attr:Array<any> = [
                {
                    "percent": 0.4,
                    "attr": {
                        // "anchorOffsetY":-52,
                        // "anchorOffsetX":-10,
                        "rotation":90,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.40,
                    "attr": {
                        // "anchorOffsetY": -52,
                        // "anchorOffsetX":20,
                       
                          "rotation":180,
                        "alpha": 1
                    }
                },
                {
                    "percent": 0.40,
                    "attr": {
                        // "anchorOffsetY":20,
                        // "anchorOffsetX":20,
                        "rotation":270,
                        "alpha": 1
                    }
                },
                  {
                    "percent": 0.40,
                    "attr": {
                        // "anchorOffsetY":20,
                        // "anchorOffsetX":20,
                        "rotation":360,
                        "alpha": 1
                    }
                },
                {
                    "percent": 1,
                    "attr": {
                        "anchorOffsetY":-1000,
                        "alpha": 0
                    }
                }
            ];
            object.alpha = 1;
            object.anchorOffsetY = 0;
            var total:number = total ? total : 1000;
            TweenEffectUtil.start(object,attr,delay,total,easeFunName,isLoop, onCallBack);
        }
         /**
         * 具体的动画实现
         * @param object
         * @param attr
         * @param delay
         * @param total
         * @param easeFunName
         * @param isLoop
         */
        private static start(object:egret.DisplayObject,attr:Array<any>,delay:number = 0,total:number = 0,easeFunName:string = "",isLoop:boolean = false, onCallBack: Function){
            egret.Tween.removeTweens(object);
            var index:number = 0;
            var attr:Array<any> = attr;
            var total:number = total;
            var tweenTime:number = 0;
            if(easeFunName){
                var easeFun:Function = eval("egret.Ease." + easeFunName);
            }else{
                easeFun = null;
            }

            setTimeout(function loop(){
                if(index >= attr.length){
                    if(isLoop){
                        index = 0;
                    }else{
                        return;
                    }
                }
                if(index > 0){
                    tweenTime = (attr[index]["percent"]  - attr[index - 1]["percent"]) * total;
                }else{
                    tweenTime = attr[index]["percent"] * total;
                }
                egret.Tween.get(object).to(attr[index]["attr"],tweenTime ,easeFun).call(loop,this);
                index ++;
            },delay)

            onCallBack();
        }


    }
}
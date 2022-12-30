/*
 * @Description  : 消除水印，针对 v2.2.9
 * @Author       : 王占领
 * @Date         : 2022-04-29 09:33:48
 * @LastEditTime: 2022-12-21 15:40:26
 * @LastEditors: 王占领
 */

import type { PluginOption } from "vite";

export default function () {
   return {
      name: "gojsHack",
      apply: "build",
      transform(src: string, id: string) {
         if (id.includes("go.js") || id.includes("go-module.js")) {
            const pattern =
               'for(var d=["5da73c80a36455d6038e4972187c3cae51fd22",sa.Dx+"4ae6247590da4bb21c324ba3a84e385776",qd.xF+"fb236cdfda5de14c134ba1a95a2d4c7cc6f93c1387",L.za],e=1;5>e;e++)b[Pa("7ca11abfd7330390")](Pa(d[e-1]),10,15*e);b[c]=Pa("39f046ebb36e4b");for(c=1;5>c;c++)b[Pa("7ca11abfd7330390")](Pa(d[c-1]),10,15*c);if(4!==d.length||"5"!==d[0][0]||"7"!==d[3][0])qd.prototype.Ed=qd.prototype.Fx;';
            const hack = "";
            const index = src.includes(pattern);

            if (!index) {
               throw new Error("gojs hack failed");
            }

            return src.replace(pattern, hack);
         }
      }
   } as PluginOption;
}

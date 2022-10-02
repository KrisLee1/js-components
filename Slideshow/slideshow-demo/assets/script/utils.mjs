/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-02 02:45:03
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-02 02:46:21
 * @FilePath: /Web/slideshow/assets/script/utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function throttled(fun, delay = 200) {
    let timer = null;
    return function(...args) {
        if(!timer){
            fun.apply(this, args);
            timer = setTimeout(() => {
                timer = null;
            }, delay);
        }

    }
}
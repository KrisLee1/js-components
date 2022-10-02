/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-01 13:13:40
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-02 20:55:38
 * @FilePath: /Web/slideshow/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Slideshow, SlideshowNavigator, SlideshowPre, SlideshowNext} from "./slideshow.mjs";


new Slideshow('#slideshow', '#slideshow .img-box')
    .addWidgets(
        new SlideshowNavigator('#slideshow .nav-box'), 
        new SlideshowPre('#slideshow .pre-btn'), 
        new SlideshowNext('#slideshow .next-btn')
    )
    .autoPlay(2000);
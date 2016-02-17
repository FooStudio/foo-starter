/**
 * Created by mendieta on 1/22/16.
 */

export default class Share {

    static openWindow(url, w, h) {
        const left = (screen.availWidth - w) >> 1;
        const top = (screen.availHeight - h) >> 1;
        window.open(url, "", "top=" + top + ",left=" + left + ",width=" + w + ",height=" + h + ",location=no,menubar=no");
    }

    static plus(url) {
        url = encodeURIComponent(url);
        this.openWindow(`https://plus.google.com/share?url=${url}`, 650, 385);
    }

    static pinterset(url, media, descr) {
        url = encodeURIComponent(url);
        media = encodeURIComponent(media);
        descr = encodeURI(descr);
        this.openWindow(`http://www.pinterest.com/pin/create/button/?url=#{url}&media=${media}&description=${descr}`, 735, 310);
    }

    static tumblr(url, media, descr) {
        url = encodeURIComponent(url);
        media = encodeURIComponent(media);
        descr = encodeURIComponent(descr);
        this.openWindow(`http://www.tumblr.com/share/photo?source=#{media}&caption=${descr}&click_thru=${url}`, 450, 430);
    }

    static facebook(url, descr = "") {
        url = encodeURIComponent(url);
        descr = encodeURIComponent(descr);
        this.openWindow(`http://www.facebook.com/share.php?u=${url}&t=${descr}`, 600, 300);
    }

    static twitter(url, descr = "") {
        url = encodeURI(url);
        descr = encodeURIComponent(descr);
        this.openWindow(`http://twitter.com/intent/tweet/?text=${descr}&url=${url}`, 600, 300);
    }

    static renren(url) {
        url = encodeURIComponent(url);
        this.openWindow(`http://share.renren.com/share/buttonshare.do?link=${url}`, 600, 300);
    }

    static weibo(url) {
        url = encodeURIComponent(url);
        this.openWindow(`http://service.weibo.com/share/share.php?url=${url}&language=zh_cn`, 600, 300);
    }


}

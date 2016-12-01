require.config({
    baseUrl: '//s1.zzhstatic.com/p-youyong/dist/js/',
    paths: {
        'lib': '//s1.zzhstatic.com/lib',
        'template': 'lib/template/3.0/template-simple',
        'css': 'lib/require/2.1/plugins/css/css', // or whatever the path to require-css is
        'text': 'lib/require/2.1/plugins/text/text', // or whatever the path to require-css is
        'jquery': 'lib/zeptojs/1.1.5/zepto'
    },
    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {}
});
if (!Function.prototype.bind) {
    // require(['lib/es5-shim/4.0.3/es5-shim']);
}

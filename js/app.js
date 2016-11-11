require.config({
    baseUrl: '//s1.zzhstatic.com/example-project/js',
    paths: {
        'jquery': 'lib/jquery/1.11.1/jquery',
        'bootstrap': '//s1.zzhstatic.com/lib/bootstrap/3.3.0/js/bootstrap.min'
    },
    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'bootstrap': ['jquery']
    }
});
if (!Function.prototype.bind) {
    require(['lib/es5-shim/4.0.3/es5-shim']);
}

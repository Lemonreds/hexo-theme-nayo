

hexo.extend.helper.register('raw_length', function (string) {
    
    if( Object.prototype.toString.call(string) ==='[object String]'){
        return string.replace(/<\/?[^>]*>/g, "").replace(/ /g, '').length
    }else{
        return 0
    }

})
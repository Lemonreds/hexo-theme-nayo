## hexo-theme-nayo

a concise theme for hexo[3.7.0].

在线预览 [preview](https://lemonreds.github.io/) | 常见问题 [common issues](https://lemonreds.github.io/2018/10/01/hexo-theme-nayo/) 

## 效果图

![Where is my image?](https://github.com/Lemonreds/hexo-theme-nayo/blob/master/src/nayo.png)

## 安装说明 

1. 从github上clone项目下来，放到目录  **yourhexoblog/themes/** 下。
```
$ git clone https://github.com/Lemonreds/hexo-theme-Nayo themes/nayo
```

或者直接download下来重名为nayo，并放到目录  **yourhexoblog/themes/** 下。

2.修改hexo的配置文件，**yourhexoblog/_config.yml** ，切换主题。

```
theme: Nayo
```

## 关于主题名字 

主题名来自歌曲 <东京不太热> -封茗囧菌

## 修改主题

主题基于 hexoAPI、webpack4.0、Sass、Ejs 开发。

修改Ejs不需要安装依赖即可生效，修改js或css则需要webpack启动服务：

0. 启动hexo，本地预览主题的修改。
```
hexo s
```

1. 安装Node依赖
```
$ npm install 
```

2. 运行开发环境
```
$ npm run dev
```

3. 生产环境打包
```
$ npm run build
```

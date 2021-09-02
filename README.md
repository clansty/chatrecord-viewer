# Chat Record Viewer

聊天记录查看器

本项目是为 [Q2TG](https://github.com/Clansty/Q2TG) 所生，设计上的作用是用于查看合并转发的消息记录。可以根据 ResID 获取并展示转发的聊天记录。

使用 Next.JS + React，用了 [Antd](https://ant.design/) 的图片放大查看组件。为了防止滥用搭建好的实例，可以设置 secretKey 用于签名校验。

## 搭建方法

1. 将 `config.example.yaml` 复制到 `config.yaml`，填写相关信息

   ```bash
   cp config.example.yaml config.yaml
   ```

   ```yaml
   host:
     account: # 用于获取记录的帐号
     password: # 密码
   token: # 随便生成一个密钥，用来校验参数的签名
   ```

2. 安装依赖

   ```bash
   yarn install
   ```

3. 编译 Next.JS

   ```bash
   yarn build
   ```

4. 运行服务

   ```
   yarn start
   ```

5. 将 `3000` 端口暴露出来，建议使用类似 caddy 的软件反代并提供 HTTPS 连接

## 签名生成

在需要生成访问链接的应用中，使用以下方式生成访问地址的 `sign` 参数

```js
md5(md5(resId) + token)
```

该生成算法位于 [`index.tsx` 的第 45 行附近](./pages/index.tsx#L45)

如果实例部署在 `https://example.com`，则访问地址为 `https://example.com/?res=ResID&sign=签名`


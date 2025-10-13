### [啟動] win開發環境專案下載步驟
確保已在node22版本 並安裝了yarn

建立一個.env 填入`ADMIN_PASSWORD= JWT_SECRET=`

然後
1. yarn install

2. npx prisma migrate dev以建立資料庫

### [Prisma] 每次資料表有變動時要做的事

1. 編輯 `prisma/schema.prisma` 新增或修改 table/欄位

2. 執行
   npx prisma migrate dev --name <描述本次變更>
   例如：
   npx prisma migrate dev --name add-user-table

3. 若出現 "@prisma/client did not initialize yet" 相關錯誤
   執行npx prisma generate

### [部屬] windows上部屬
1. yarn install

2. yarn build

3. $env:HOST="0.0.0.0" $env:PORT="xxxx" 
yarn start 前兩個不用一直打

### [部屬] linux正式環境部屬

確保已在node22版本 並安裝了yarn

確保已安裝pm2

1. 根目錄下建立.env 直接

```
HOST=0.0.0.0
ADMIN_PASSWORD=xxxx
JWT_SECRET=xxxx
```
2. 下載pm2，同時在根目錄新增ecosystem.config.cjs

    其中xxxx是指定服務運行的Port 預設是3000
```
module.exports = {
  apps: [
    {
      name: 'mirai-web', 
      script: '.output/server/index.mjs',
      env_file: '.env',
      env: {
        NITRO_PORT: xxxx,
      }
    }
  ]
}
```

3. yarn install

4. yarn build

5. pm2 start ecosystem.config.cjs以此在後台執行專案

6. 使用Cloudflare tunnel反向代理xxxx端口

### [更新] linux正式環境更新版本

1. pm2 delete mirai-web

2. rm -rf .output

3. pull專案

如果有DB欄位更新，還需要

4. npx prisma migrate deploy

5. npx prisma generate

然後完整部屬專案再走一遍
6. yarn install

7. yarn build

8. pm2 start ecosystem.config.cjs
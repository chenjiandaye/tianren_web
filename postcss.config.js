module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 192, // 设计稿宽度的1/10,
      propList: ['*','!border'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
      unitPrecision: 8, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      selectorBlackList: ['infoName'],
      minPixelValue: 1
    }
  }
}
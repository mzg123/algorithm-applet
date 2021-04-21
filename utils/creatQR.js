


const drawCertQrCode = ({
  ctx,
	codeContent, //绘制内容
	multi, //放大比例
	width, //二维码宽度
}) => {
	let color = "#000000" //二维码颜色
	let logoID = '/static/logo.png' //logo图标ID
	//let width = 101 //由请求响应包 width得到，非固定值
	let widthBlock = 4 //白边为4个模块，是标准，下面做图片放大时候会自动放大
	const white = "#ffffff";
  const black = color;
  
	//绘制二维码区域
  const canvasWidth = (width + widthBlock * 2) * multi;

	// 绘制白色底图
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvasWidth, canvasWidth);
	const sourceBytes = new Int8Array(wx.base64ToArrayBuffer(codeContent)); //base64解码
	//填充数据
	const n = width;
	const wid = Math.ceil(n / 8); //每一行的字节数
	for (let i = 0; i < n; i++) {
		//高循环
		const ln = i * wid;
		for (let j = 0; j < n; j++) {
			//宽循环
			const k = ln + parseInt(j / 8, 10); //像素点所在的字节下标
			// sourceBytes[k] 像素点所在的字节
			const color =
				0 === (sourceBytes[k] & (1 << (7 - (j % 8)))) ? white : black;
			ctx.fillStyle = color;
			ctx.fillRect(
				(j + widthBlock) * multi,
				(i + widthBlock) * multi,
				multi,	
				multi
			);
		}
	}
  ctx.draw()
	const logoWidth = 10*multi;
	const logoHeight = 10*multi;
	const ctxWidth = canvasWidth;
	const ctxHeight = canvasWidth;
	let _width = (ctxWidth - logoWidth) / 2;
	let _height = (ctxHeight - logoHeight) / 2;
	ctx.drawImage(
		logoID,
		_width,
		_height,
		logoWidth,
		logoHeight
	);	
	ctx.draw(true)  
}

module.exports.drawCertQrCode=drawCertQrCode
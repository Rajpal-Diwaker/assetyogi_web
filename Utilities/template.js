const year = new Date().getFullYear();

let forgotPasswordAdmin = (link) => {
    let html = `<!doctype html>
	<html>
	<head>
	<title>Findemy</title>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	</head>
	<body style="margin:0; padding:0;">
	<div style="max-width:850px; margin:auto;">
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr>
	<td><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto;">
	<tr>
	<td style="font-size:24px; padding:15px; font-family:arial; color:#79e4c2;">
		<img src="ng:15px; font-family:arial; color:#79e4c2;">       <img src="https://res.cloudinary.com/mani1995/image/upload/v1628842657/logo.png" style="width: 40px;margin: 20px auto;display: block;">
	</td>
	</tr>
	<tr>
	<td align="center" style="font-size:16px; padding:15px; font-family:arial; background:#fff;"><img src="http://res.cloudinary.com/dpzfuvpyo/image/upload/v1556777774/gbzbabxdvu4kkyiqjt6z.png" width="125" height="125" alt="" /></td>
	</tr>
	</table></td>
	</tr>
	<tr>
	<td valign="top"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="text-align:center; line-height:24px; background:#fff;">
	<tr>
	<td style="font-size:24px; padding:15px; font-weight:bold; font-family:arial; color:#000;">Reset your Password</td>
	</tr>
	<tr>
	<td style="font-size:16px; padding:15px; font-family:arial; color:#959595;">You're almost done. Click here to reset the Password</td>
	</tr>
	<tr>
	
	<td align="center" style="padding:30px; padding-bottom:0;"><div style="font-size:16px; font-family:arial; font-weight:bold; color: #fff; background:#79e4c2; padding:10px 40px; color:#fff; border-radius:25px; width:250px; display:block;"><a href="${link}" data_target="blank" style="color:#fff; border-radius:25px; width:250px; text-decoration:none;">Click Here</a></div></td>
	</tr>
	<tr>
	<td style="font-size:13px; font-style:italic; font-family:arial; color:#959595;"><sup>*</sup> Please Reset Password through this button.</td>
	</tr>
	<tr>
	<td style="font-size:16px; padding-top:50px; font-family:arial; color:#959595;">Copyright © ${year} Findemy ltd. All rights reserved.</td>
	</tr>
	</table></td>
	</tr>
	</table>
	</div>
	</body>
	</html>`;

    return html;
}

module.exports = {
    forgotPasswordAdmin: forgotPasswordAdmin
}
var SITEURL = process.env.SITEURL;
var ABSOLUTEPATH = process.env.ABSOLUTEPATH;
module.exports = {
	
	FORMATETIME	:	'DD-MM-YYYY hh:mm A',
    FORMATEDATE	:	'MM-DD-YYYY',
	
	SITEURL : process.env.SITEURL+":"+process.env.PORT,
	ADMINSITEURL	:	SITEURL+'admin/',
	USERSITEURL		:	SITEURL+'user/',
	SHOWLANGUAGEPATH	:	SITEURL+'assets/files/languages/',	

	UPLOADPAGEIMAGE	:	ABSOLUTEPATH+'public/assets/files/pageimages/',
	UPLOADPAGEIMAGEURL	:	SITEURL+'assets/files/pageimages/',	


	SAMPLEEXPORTUSERCSVURL	:	SITEURL+'assets/files/sample/user/',
	//BUSINESS_FIELD:[]
	JWT_SECRET 		: 'addjsonwebtokensecretherelikeQuiscustodietipsoscustodes',
	TIMEZONE		:	process.env.TIMEZONE,
	FORMATETIME		:	'DD-MM-YYYY hh:mm A',
	PRIFIXORDERID	: 	"OD",
	ORDER_DATA_LIMIT : 	10,
	COVERAGE_DATA_LIMIT : 	10,
	ORDER_DATA_PAGE : 1,
	//new sram_app

	UPLOAD_USER_PROFILE	:	`${ABSOLUTEPATH}/public/assets/files/userimage/`,
	SHOW_USER_PROFILE	:	`${SITEURL}assets/files/userimage/`,
}

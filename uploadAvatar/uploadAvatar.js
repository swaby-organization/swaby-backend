// 'use strict';

// const { userModel } = require( '../DatabaseModels' );



// const uploadAvatar = async ( req, res ) => {
//     const { id } = req.user;
//     const { file } = req;
//     const { path } = file;
//     const avatar = path.split( '/' ).pop();
//     const user = await userModel.findOne( {
//         where: {
//             id
//         }
//     } );
//     if ( user ) {
//         user.avatar = avatar;
//         await user.save();
//     await userModel.update( { avatar: location }, { where: { id } } );
//     res.status( 200 ).send( location );
// };
// }
// module.exports = uploadAvatar;

module.exports = (user,req) =>{
    user.password = ""
    console.log("AVATAR ",user.avatar)
    if(user.avatar == null) user.avatar = "profile-user.png" 
    user.avatar =  `${req.protocol}://${req.get('host')}/uploads/users_avatar/${user.avatar}`
    user.email = "*************@***.**"
    return user
}